import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { FindChapterRoomIdResDto } from './dto/response/findbychapter-id.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { FindByNovelRoomIdDto } from './dto/request/findby-novel-room-id.dto';
import {
  ChapterRepository,
  ChapterRepositoryToken,
} from './repository/chapter.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { ChapterStatusEnum } from './entities/enums/chapter-status.enum';
import { ChangeTitleDto } from './dto/request/change-title.dto';
import { UserEntity } from '@app/user/entities/user.entity';

@Injectable()
export class ChapterService {
  private logger = new Logger(ChapterService.name);

  constructor(
    @Inject(ChapterRepositoryToken)
    private chapterRepository: ChapterRepository,
  ) {}

  /**
   *  회차 정보 저장
   */
  async save(entity: Partial<ChapterEntity>): Promise<void> {
    // const count = await this.chapterRepository.chapterCount(entity.novelRoomId);
    // entity.setNextNo(count);
    await this.chapterRepository.saveRow(entity);
    return;
  }
  /**
   * 회차 정보 수정
   */
  async update(id: number, entity: Partial<ChapterEntity>): Promise<void> {
    await this.chapterRepository.updateRow(id, entity);
    return;
  }
  /**
   * 회차 연재 신청
   */
  async applyChapter(id: number): Promise<void> {
    const chapter = await this.findOneChapterId(id);
    if (chapter.status !== ChapterStatusEnum.WRITING) {
      throw new ConflictException('작성중인 회차가 아닙니다.');
    }
    chapter.chpaterReview();
    this.logger.log(`Chapter Apply ${JSON.stringify(chapter)}`);
    await this.save(chapter);
  }
  /**
   *  회차 제목 수정
   */
  async changeTitle(id: number, dto: ChangeTitleDto): Promise<void> {
    const chapter = await this.findOneChapterId(id);
    if (!chapter) {
      throw new ConflictException('존재하지 않는 회차 입니다.');
    }
    chapter.changeTitle(dto.title);
    await this.save(chapter);
  }
  /*
   *  회차 삭제
   */
  async delete(id: number, user: UserEntity): Promise<void> {
    await this.chapterRepository.deleteRow(id);
    return;
  }
  /**
   *  회차 조회
   */
  async findChapterText(
    dto: FindByNovelRoomIdDto,
  ): Promise<PagingationResponse<FindChapterRoomIdResDto>> {
    const [chapters, totalCount] =
      await this.chapterRepository.findChpaterByRoomIdAndCount(
        dto.novelRoomId,
        dto,
      );
    const items = chapters.map(
      (chapter) => new FindChapterRoomIdResDto(chapter),
    );
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }

  private findOneChapterId(id: number): Promise<ChapterEntity> {
    return this.chapterRepository.findOneByOptions({
      where: {
        id,
      },
    });
  }
  private async nextChapterNo(novelRoomId: number): Promise<number> {
    const chpaterNo = await this.chapterRepository.chapterCount(novelRoomId);
    return chpaterNo + 1;
  }
}
