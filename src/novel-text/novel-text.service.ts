import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { FindByChapterIdResponseDto } from './dto/response/findbychapter-id.dto';
import { NovelTextEntity } from './entities/novel-text.entity';
import { NovelTextRepository } from './repository/novel-text.repository';
import { ChatsService } from '@app/chats/chats.service';
import { ChatsGateway } from '@app/chats/chats.gateway';
import {
  NovelWriterRepository,
  NovelWriterRepositoryToken,
} from '@app/novel-writer/repository/novel-writer.repository';
import { writer } from 'repl';
import {
  NovelRoomRepo,
  NovelRoomRepository,
} from '@app/novel-room/repository/novel-room.repository';

@Injectable()
export class NovelTextService {
  private logger = new Logger(NovelTextService.name);

  constructor(
    @Inject(NovelTextRepository)
    private novelTextRepository: NovelTextRepository,
    @Inject(NovelWriterRepositoryToken)
    private novelWriterRepository: NovelWriterRepository,
    @NovelRoomRepo()
    private novelRoomRepo: NovelRoomRepository,
    private chatsGateway: ChatsGateway,
  ) {}
  async create(
    roomId: number,
    entity: Partial<NovelTextEntity>,
  ): Promise<void> {
    await this.novelTextRepository.addRow(entity);
    const room = await this.novelRoomRepo.getById(roomId);
    const writers = await this.novelWriterRepository.findByNovelRoomId(roomId);
    const requestWriter = writers.filter(
      (writer) => writer.user.id === entity.createdBy.id,
    )[0];
    requestWriter.currentlyWriting = false;
    await this.novelWriterRepository.updateRow(requestWriter.id, requestWriter);
    const nextWriter = writers.filter((writer) => {
      const dividNextSeq = (requestWriter.writingSeq + 1) / room.type;
      const nextSeq = dividNextSeq === 0 ? room.type : writer.writingSeq;
      return writer.writingSeq === nextSeq;
    })[0];
    nextWriter.currentlyWriting = true;
    await this.novelWriterRepository.updateRow(nextWriter.id, nextWriter);
    this.chatsGateway.server.to('').emit('enterChat', entity);
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
}
