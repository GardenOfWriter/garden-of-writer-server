import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { FindChapterRoomIdResDto } from './dto/response/findbychapter-id.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { FindByNovelRoomIdDto } from './dto/request/findby-novel-room-id.dto';
import { ChapterRepo, ChapterRepository, ChapterRepositoryToken } from './repository/chapter.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { ChapterStatusEnum } from './entities/enums/chapter-status.enum';
import { ChangeTitleDto } from './dto/request/change-title.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { isEmpty } from '../commons/util/data.helper';
import { NotFoundChapterException, NotWritingChapterException } from './exception/chpater.exception';

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
    @ChapterRepo()
    private readonly chapterRepository: ChapterRepository,
  ) {}

  /**
   * 회차 생성
   *
   * @async
   * @param {Partial<ChapterEntity>} entity 생성할 회차 정보
   * @returns {Promise<void>}
   */
  async save(entity: Partial<ChapterEntity>): Promise<void> {
    // const count = await this.chapterRepository.chapterCount(entity.novelRoomId);
    // entity.setNextNo(count);
    await this.chapterRepository.saveRow(entity);
    return;
  }

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
    await this.save(chapter);
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
    if (!isEmpty(chapter)) throw new NotFoundChapterException();
    chapter.changeTitle(dto.title);
    await this.save(chapter);
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
  async findChapterText(dto: FindByNovelRoomIdDto): Promise<PagingationResponse<FindChapterRoomIdResDto>> {
    const [chapters, totalCount] = await this.chapterRepository.findChpaterByRoomIdAndCount(dto.novelRoomId, dto);
    const items = chapters.map((chapter) => new FindChapterRoomIdResDto(chapter));
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }

  /**
   * 소설 공방에 해당하는 회차 목록 조회
   *
   * @private
   * @param {number} id 조회할 소설 공방 Id
   * @returns {Promise<ChapterEntity>} 조회된 회차 목록
   */
  private findByChapterId(id: number): Promise<ChapterEntity> {
    return this.chapterRepository.findOneByOptions({
      where: {
        id,
      },
    });
  }
  private async nextChapterNo(novelRoomId: number): Promise<number> {
    const chpaterNo = await this.chapterRepository.count(novelRoomId);
    return chpaterNo + 1;
  }
}
