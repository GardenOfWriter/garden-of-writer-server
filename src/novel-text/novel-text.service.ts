import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { FindByChapterIdResponseDto } from './dto/response/findbychapter-id.dto';
import { NovelTextEntity } from './entities/novel-text.entity';
import { NovelTextRepository } from './repository/novel-text.repository';
import { ChatsService } from '@app/chats/chats.service';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { NovelWriterRepository, NovelWriterRepositoryToken } from '@app/novel-writer/repository/novel-writer.repository';
import { NotCurrentlyWriterException } from './exception/novel-text.exception';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';

@Injectable()
export class NovelTextService {
  private logger = new Logger(NovelTextService.name);

  constructor(
    @Inject(NovelTextRepository)
    private novelTextRepository: NovelTextRepository,
    @Inject(NovelWriterRepositoryToken)
    private novelWriterRepo: NovelWriterRepository,
    private chatsGateway: ChatsGateway,
  ) {}
  /**
   *
   * @param roomId
   * @param entity
   * @returns
   */
  async create(novelRoomId: number, entity: Partial<NovelTextEntity>, user: UserEntity): Promise<void> {
    const writerCount = await this.novelWriterRepo.countByNovelRoomId(novelRoomId);
    await this.nextWriterUpdate(user.id, writerCount, novelRoomId);
    const textId = await this.novelTextRepository.addRow(entity);
    this.chatsGateway.server.to(`room-${novelRoomId}`).emit('enterText', { textId });
    return;
  }
  async update(id: number, entity: Partial<NovelTextEntity>): Promise<void> {
    await this.novelTextRepository.updateRow(id, entity);
    this.chatsGateway.server.to('').emit('updateChat', entity);
    return;
  }

  async delete(id: number, user: UserEntity): Promise<void> {
    const novelText = await this.novelTextRepository.findByChapterId({
      where: { id },
    });
    // 아래 validation 반드시 필요. 추후 구현
    // if (novelText.createdBy.id !== user.id) {
    //   throw new ConflictException('작성자가 아닙니다.');
    // }
    await this.novelTextRepository.deleteRow(id);
    return;
  }

  async findChapterText(chapterId: number) {
    const texts = await this.novelTextRepository.findByChapterId({
      where: { chapterId },
    });
    return texts.map((text) => new FindByChapterIdResponseDto(text));
  }

  private async nextWriterUpdate(userId: number, writerCount: number, novelRoomId: number): Promise<void> {
    const requestWriter = await this.updateRequestWriter(userId);
    const nextSeq = requestWriter.getNextSeq(writerCount);
    const nextWriter = await this.novelWriterRepo.findByNovelRoomIdAndWriterSeq(novelRoomId, nextSeq);
    await this.updateNextWriter(nextWriter.user.id);
    return;
  }
  /**
   *
   * @param writers
   * @returns
   */
  private async updateRequestWriter(userId: number): Promise<NovelWriterEntity> {
    const requestWriter = await this.novelWriterRepo.findByUserId(userId);
    this.logger.debug(`requestWriter: ${JSON.stringify(requestWriter)}`);
    if (!requestWriter || !requestWriter.isCurrentlyWriter()) {
      throw new NotCurrentlyWriterException();
    }
    requestWriter.setCurrentyWriter(false);
    await this.novelWriterRepo.updateRow(requestWriter.id, requestWriter);
    return requestWriter;
  }
  /**
   *
   * @param writers
   * @param currentWriteringSeq
   * @returns
   */
  private async updateNextWriter(userId: number): Promise<NovelWriterEntity> {
    const writer = await this.novelWriterRepo.findByUserId(userId);
    writer.setCurrentyWriter(true);
    this.logger.debug(`nextWriter: ${JSON.stringify(writer)}`);
    await this.novelWriterRepo.updateRow(writer.id, writer);
    return writer;
  }
}
