import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { FindChapterRoomIdResDto } from './dto/response/findbychapter-id.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { FindByNovelRoomIdDto } from './dto/request/findby-novel-room-id.dto';
import { ChapterRepo, ChapterRepository } from './repository/chapter.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { ChangeTitleDto } from './dto/request/change-title.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { isEmpty } from '../commons/util/data.helper';
import { NotFoundChapterException, NotWritingChapterException } from './exception/chpater.exception';
import { ChapterStatusEnum } from './entities/enums/chapter-status.enum';
import { CreateChapterRequestDto } from './dto/request/create-chapter.dto';
import { NovelRoomRepo, NovelRoomRepository } from '@app/novel-room/repository/novel-room.repository';
import { NovelRoomStatusEnum } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { ChapterLikeRepo, ChapterLikeRepository } from './repository/chapter-like.repository';
import { ChapterCommentRepo, ChapterCommentRepository } from './repository/chapter-comment.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

/**
 * 회차 서비스 클래스
 *
 * @export
 * @class ChapterService  회차 서비스 클래스
 * @typedef {ChapterService} ChapterService
 */
@Injectable()
export class ChapterService {
  private logger = new Logger(ChapterService.name);

  constructor(
    @NovelRoomRepo()
    private readonly novelRoomRepository: NovelRoomRepository,
    @ChapterRepo()
    private readonly chapterRepository: ChapterRepository,

    @ChapterLikeRepo()
    private readonly chapterLikeRepository: ChapterLikeRepository,

    @ChapterCommentRepo()
    private readonly chapterCommoentRepository: ChapterCommentRepository,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  // /**
  //  * 회차 생성
  //  *
  //  * @async
  //  * @param {Partial<ChapterEntity>} entity 생성할 회차 정보
  //  * @returns {Promise<void>}
  //  */
  // async saveNextChapter(entity: Partial<ChapterEntity>): Promise<void> {
  //   const count = await this.nextChapterNo(entity.novelRoomId);
  //   entity.setNo(count);
  //   await this.chapterRepository.saveRow(entity);
  //   return;
  // }

  /**
   * 회차 수정
   *
   * @async
   * @param {number} id 회차 Id
   * @param {Partial<ChapterEntity>} entity 수정할 회차 정보
   * @returns {Promise<void>}
   */
  async update(id: number, entity: Partial<ChapterEntity>): Promise<void> {
    await this.chapterRepository.updateRow(id, entity);
    return;
  }

  /**
   * 회차 상태 변경
   *
   * @async
   * @param {number} id
   * @returns {Promise<void>}
   */
  async applyChapter(id: number): Promise<void> {
    const chapter = await this.findByChapterId(id);
    if (!chapter.isWritingStatus()) throw new NotWritingChapterException();
    chapter.setReviewStatus();
    this.logger.log(`Chapter Apply ${JSON.stringify(chapter)}`);
    await this.chapterRepository.saveRow(chapter);
    if (chapter.isFirstChapter()) {
      this.logger.log(`Chapter Status Series ${JSON.stringify(chapter)}`);
      const novelRoom = await this.novelRoomRepository.getById(chapter.novelRoomId);
      novelRoom.changeStatus(NovelRoomStatusEnum.SERIES);
      await this.novelRoomRepository.saveRow(novelRoom);
    }
    return;
  }

  /**
   * 회차 제목 변경
   *
   * @async
   * @param {number} id 회차 Id
   * @param {ChangeTitleDto} dto 변경할 제목
   * @returns {Promise<void>}
   */
  async changeTitle(id: number, dto: ChangeTitleDto): Promise<void> {
    const chapter = await this.findByChapterId(id);
    if (isEmpty(chapter)) throw new NotFoundChapterException();
    chapter.changeTitle(dto.title);
    await this.chapterRepository.saveRow(chapter);
    return;
  }

  /**
   * 다음 회차 생성
   *
   * @async
   * @param {number} id 회차 Id
   * @returns {Promise<void>} 다음 회차 생성
   *
   */
  async saveNextChpater(dto: CreateChapterRequestDto, user: UserEntity): Promise<void> {
    const chapter = await this.findByChapterId(dto.id);
    const countChapter = await this.chapterRepository.countByNovelRoomId(+chapter.novelRoomId);
    if (isEmpty(chapter)) throw new NotFoundChapterException();
    const nextChapter = ChapterEntity.of(+chapter.novelRoomId, ChapterStatusEnum.WRITING, user, '임시 회차', countChapter + 1);
    await this.chapterRepository.saveRow(nextChapter);
    return;
  }

  /**
   * 회차 삭제
   *
   * @async
   * @param {number} id 회차 Id
   * @param {UserEntity} user 사용자 정보
   * @returns {Promise<void>}
   */
  async delete(id: number, user: UserEntity): Promise<void> {
    await this.chapterRepository.deleteRow(id);
    return;
  }

  /**
   * 소설 공방에 해당하는 회차 목록 조회 (텍스트 조회) 페이지 네이션 적용
   *
   * @async
   * @param {FindByNovelRoomIdDto} dto 조회할 소설 공방 Id
   * @returns {Promise<PagingationResponse<FindChapterRoomIdResDto>>} 조회된 회차 목록
   */
  async findByNovelIdChapter(dto: FindByNovelRoomIdDto): Promise<PagingationResponse<FindChapterRoomIdResDto>> {
    const [chapters, totalCount] = await this.chapterRepository.findChpaterByRoomIdAndCount(dto.novelRoomId, dto);

    if (isEmpty(chapters)) throw new NotFoundChapterException();

    const items = await this.findLikeCount(chapters);

    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }

  private async findLikeCount(chapters: ChapterEntity[]): Promise<FindChapterRoomIdResDto[]> {
    const chapterIds = chapters.map((chapter) => chapter.id);
    const likes = await this.chapterLikeRepository.countInChapterIds(chapterIds);

    return this.mapper.mapArrayAsync(chapters, ChapterEntity, FindChapterRoomIdResDto, {
      // TODO : beforeMap 과 afterMap 의 차이를 알기
      // beforeMap 을 했을때는 commentCount,likeCount 가 안나왔는데
      // afterMap 을 했더니 commentCount,likeCount 가 출력된다

      afterMap: (sourceArray, destinationArray) => {
        sourceArray.forEach((source, index) => {
          const destination = { ...destinationArray[index] };
          destination.likeCount = !isEmpty(likes) ? likes.find((like) => like.chapterId === source.id).count : 0;
          destination.commentCount = 0;
          destinationArray[index] = { ...destination };
        });
      },
    });
  }
  /**
   * 소설 공방에 해당하는 회차 목록 조회
   *
   * @private
   * @param {number} id 조회할 소설 공방 Id
   * @returns {Promise<ChapterEntity>} 조회된 회차 목록
   */
  async findByChapterId(id: number): Promise<ChapterEntity> {
    return this.chapterRepository.findOneByOptions({
      where: {
        id,
      },
    });
  }
}
