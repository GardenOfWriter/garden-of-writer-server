import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { FindByChapterIdResponseDto } from './dto/response/findbychapter-id.dto';
import { NovelTextEntity } from './entities/novel-text.entity';
import { NovelTextRepo, NovelTextRepository } from './repository/novel-text.repository';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { NovelWriterRepo, NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';
import { NotCurrentlyWriterException, NotFoundTextException } from './exception/novel-text.exception';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { SOCKET_EVENT } from '@app/chats/enums/socket.event';

/**
 * 소설 텍스트 서비스
 *
 * @export
 * @class NovelTextService
 * @typedef {NovelTextService}
 */
@Injectable()
export class NovelTextService {
  private logger = new Logger(NovelTextService.name);

  constructor(
    @NovelTextRepo()
    private novelTextRepo: NovelTextRepository,
    @NovelWriterRepo()
    private novelWriterRepo: NovelWriterRepository,
    private chatsGateway: ChatsGateway,
  ) {}

  /**
   * 소설 텍스트 생성
   *
   * @async
   * @param {number} novelRoomId 공방 Id
   * @param {Partial<NovelTextEntity>} entity  소설 텍스트 정보 엔티티
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {Promise<void>}
   */
  async create(novelRoomId: number, entity: Partial<NovelTextEntity>, user: UserEntity): Promise<void> {
    const writerCount = await this.novelWriterRepo.countByNovelRoomId(novelRoomId);
    await this.nextWriterUpdate(user.id, writerCount, novelRoomId);
    const textId = await this.novelTextRepo.addRow(entity);
    this.chatsGateway.sendNovelRoomInMessage(novelRoomId, SOCKET_EVENT.ENTER_TEXT, JSON.stringify({ textId }));
    return;
  }

  /**
   * 소설 텍스트 수정
   *
   * @async
   * @param {number} novelRoomId 공방 Id
   * @param {number} id 소설 텍스트 Id
   * @param {Partial<NovelTextEntity>} entity 소설 텍스트 정보 엔티티
   * @returns {Promise<void>}
   */
  async update(novelRoomId: number, entity: Partial<NovelTextEntity>): Promise<void> {
    await this.novelTextRepo.updateRow(entity.id, entity);
    this.chatsGateway.sendNovelRoomInMessage(novelRoomId, SOCKET_EVENT.UPDATE_TEXT, JSON.stringify({ textId: entity.id }));
    return;
  }

  /**
   * 소설 텍스트 삭제
   *
   * @async
   * @param {number} id 소설 텍스트 Id
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {Promise<void>}
   */
  async delete(id: number, user: UserEntity): Promise<void> {
    // const novelText = await this.novelTextRepo.findByChapterId();
    // 아래 validation 반드시 필요. 추후 구현
    // if (novelText.createdBy.id !== user.id) {
    //   throw new ConflictException('작성자가 아닙니다.');
    // }
    await this.novelTextRepo.deleteRow(id);
    return;
  }

  /**
   * 소설 텍스트 조회 (회차 ID로 조회))
   *
   * @async
   * @param {number} chapterId 회차 ID
   * @returns {Promise<FindByChapterIdResponseDto[]>} 조회된 소설 텍스트 정보 DTO
   */
  async findByChapterIdNovelText(chapterId: number): Promise<FindByChapterIdResponseDto[]> {
    const texts = await this.novelTextRepo.findByChapterId(chapterId);
    return texts.map((text) => new FindByChapterIdResponseDto(text));
  }

  /**
   * 소설 텍스트 조회 (ID로 조회)
   *
   * @async
   * @param {number} textId
   * @returns {Promise<NovelTextEntity>} 조회된 소설 텍스트 정보 엔티티
   */
  async findById(textId: number): Promise<NovelTextEntity> {
    const text = await this.novelTextRepo.findById(textId);
    if (!text) {
      throw new NotFoundTextException();
    }
    return text;
  }

  /**
   * 다음 글쓰기 업데이트
   *
   * @private
   * @async
   * @param {number} userId 유저 ID
   * @param {number} writerCount 작가 수
   * @param {number} novelRoomId 공방 ID
   * @returns {Promise<void>}
   */
  private async nextWriterUpdate(userId: number, writerCount: number, novelRoomId: number): Promise<void> {
    const requestWriter = await this.updateRequestWriter(userId);
    const nextSeq = requestWriter.getNextSeq(writerCount);
    const nextWriter = await this.novelWriterRepo.findByNovelRoomIdAndWriterSeq(novelRoomId, nextSeq);
    await this.updateNextWriter(nextWriter.user.id);
    return;
  }

  /**
   * 현재 글쓰기 요청자 업데이트
   *
   * @private
   * @async
   * @param {number} userId 유저 ID
   * @returns {Promise<NovelWriterEntity>} 현재 글쓰기 요청자 엔티티
   */
  private async updateRequestWriter(userId: number): Promise<NovelWriterEntity> {
    const requestWriter = await this.novelWriterRepo.findByUserId(userId);
    this.logger.debug(`현재 글쓰기 : ${JSON.stringify(requestWriter)}`);
    if (!requestWriter || !requestWriter.isCurrentlyWriter()) {
      throw new NotCurrentlyWriterException();
    }
    requestWriter.setCurrentyWriter(false);
    await this.novelWriterRepo.updateRow(requestWriter.id, requestWriter);
    return requestWriter;
  }

  /**
   * 다음 글쓰기 업데이트
   *
   * @private
   * @async
   * @param {number} userId 유저 ID
   * @returns {Promise<NovelWriterEntity>} 다음 글쓰기 엔티티
   */
  private async updateNextWriter(userId: number): Promise<NovelWriterEntity> {
    const writer = await this.novelWriterRepo.findByUserId(userId);
    writer.setCurrentyWriter(true);
    this.logger.debug(`Next Writer : ${JSON.stringify(writer)}`);
    await this.novelWriterRepo.updateRow(writer.id, writer);
    return writer;
  }
}
