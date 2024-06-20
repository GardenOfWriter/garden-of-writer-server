import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { FindByChapterIdResponseDto } from './dto/response/findbychapter-id.dto';
import { NovelTextEntity } from './entities/novel-text.entity';
import { NovelTextRepo, NovelTextRepository } from './repository/novel-text.repository';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { NovelWriterRepo, NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';
import { NotFoundTextException } from './exception/novel-text.exception';
import { SOCKET_EVENT } from '@app/chats/enums/socket.event';
import { ChapterRepo, ChapterRepository } from '@app/chapter/repository/chapter.repository';
import { isEmpty } from '../commons/util/data.helper';
import { WriterSeqHelper } from '@app/novel-writer/helper/writer-seq.helper';
import { UpdateTextNovelRequestDto } from './dto/request/update-novel.dto';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { FindByChapterIdNovelTextDto } from './dto/request/findby-chapterid.dto';

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
    @ChapterRepo()
    private chapterRepo: ChapterRepository,
    private chatsGateway: ChatsGateway,
    private writerSeqHelper: WriterSeqHelper,
  ) {}

  /**
   * 소설 텍스트 생성
   *
   * @async
   * @param {number} novelRoomId 공방 Id
   * @param {Partial<NovelTextEntity>} entity 소설 텍스트 정보 엔티티
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {Promise<void>}
   */
  async create(entity: Partial<NovelTextEntity>): Promise<void> {
    const chapter = await this.chapterRepo.findById(entity.chapterId);
    const textId = await this.novelTextRepo.addRow(entity);
    this.chatsGateway.sendNovelRoomInMessage(chapter.novelRoomId, SOCKET_EVENT.ENTER_TEXT, JSON.stringify({ textId, chapterId: entity.chapterId }));
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
  async update(id: number, dto: UpdateTextNovelRequestDto): Promise<void> {
    const entity = await this.novelTextRepo.findByIdJoinUser(id);
    entity.updateContent(dto.content);

    await this.novelTextRepo.updateRow(entity.id, entity);
    this.chatsGateway.sendNovelRoomInMessage(
      entity.createdBy.id,
      SOCKET_EVENT.UPDATE_TEXT,
      JSON.stringify({ textId: entity.id, chapterId: entity.chapterId }),
    );
    return;
  }

  /**
   * 소설 텍스트 작성 완료
   *
   * @async
   * @param {number} id 소설 텍스트 Id
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {Promise<void>}
   */
  async complatedText(id: number, user: UserEntity): Promise<void> {
    const text = await this.novelTextRepo.findByIdJoinUser(id);
    text.setComplated();
    const chapter = await this.chapterRepo.findById(text.chapterId);
    const writers = await this.novelWriterRepo.findByNovelRoomIdWhereAttending(+chapter.novelRoomId);
    const nextWriter = this.writerSeqHelper.getNextWriter(writers);
    nextWriter.setCurrentyWriter(true);
    await this.novelTextRepo.addRow(text);
    await this.novelWriterRepo.updateRow(nextWriter.id, nextWriter);
    console.log(text);
    this.chatsGateway.sendNovelRoomInMessage(
      text.createdBy.id,
      SOCKET_EVENT.UPDATE_TEXT,
      JSON.stringify({ textId: text.id, chapterId: text.chapterId }),
    );
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
  async findByChapterIdNovelText(dto: FindByChapterIdNovelTextDto): Promise<PagingationResponse<FindByChapterIdResponseDto>> {
    const [texts, totalCount] = await this.novelTextRepo.findByChapterIdJoinUser(dto.chapterId, dto);
    const item = texts.map((text) => new FindByChapterIdResponseDto(text));
    return new PagingationResponse(totalCount, dto.chunkSize, item);
  }

  /**
   * 소설 텍스트 조회 (ID로 조회)
   *
   * @async
   * @param {number} textId 소설 텍스트 ID
   * @returns {Promise<NovelTextEntity>} 조회된 소설 텍스트 정보 엔티티
   */
  async findById(textId: number): Promise<FindByChapterIdResponseDto> {
    const text = await this.novelTextRepo.findByIdJoinUser(textId);
    if (isEmpty(text)) {
      throw new NotFoundTextException();
    }
    return new FindByChapterIdResponseDto(text);
  }

  // /**
  //  * 다음 글쓰기 업데이트
  //  *
  //  * @private
  //  * @async
  //  * @param {number} userId 유저 ID
  //  * @param {number} writerCount 작가 수
  //  * @param {number} novelRoomId 공방 ID
  //  * @returns {Promise<void>}
  //  */
  // private async findNextWrite(userId: number, writerCount: number, novelRoomId: number): Promise<NovelWriterEntity> {
  //   const requestWriter = await this.updateRequestWriter(userId);
  //   const nextSeq = requestWriter.getNextSeq(writerCount);
  //   return await this.novelWriterRepo.findByNovelRoomIdAndWriterSeq(novelRoomId, nextSeq);
  // }

  // /**
  //  * 현재 글쓰기 요청자 업데이트
  //  *
  //  * @private
  //  * @async
  //  * @param {number} userId 유저 ID
  //  * @returns {Promise<NovelWriterEntity>} 현재 글쓰기 요청자 엔티티
  //  */
  // private async updateRequestWriter(userId: number): Promise<NovelWriterEntity> {
  //   const requestWriter = await this.novelWriterRepo.findByUserId(userId);
  //   this.logger.debug(`현재 글쓰기 : ${JSON.stringify(requestWriter)}`);
  //   if (!isEmpty(requestWriter) && !requestWriter.isCurrentlyWriter()) {
  //     throw new NotCurrentlyWriterException();
  //   }
  //   requestWriter.setCurrentyWriter(false);
  //   await this.novelWriterRepo.updateRow(requestWriter.id, requestWriter);
  //   return requestWriter;
  // }
}
