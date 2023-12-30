import { Inject, Injectable, Logger } from '@nestjs/common';
import { FindChapterByNovelRoomIdResponseDto } from './dto/response/findbychapter-id.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { FindByNovelRoomIdDto } from './dto/request/findby-novel-room-id.dto';
import {
  ChapterRepository,
  ChapterRepositoryToken,
} from './repository/chapter.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { ChapterStatusEnum } from './entities/enums/chapter-status.enum';
import { ChangeTitleDto } from './dto/request/change-title.dto';

@Injectable()
export class ChapterService {
  private logger = new Logger(ChapterService.name);

  constructor(
    @Inject(ChapterRepositoryToken)
    private chapterRepository: ChapterRepository,
  ) {}
  async save(entity: Partial<ChapterEntity>): Promise<void> {
    await this.chapterRepository.saveRow(entity);
    return;
  }
  async update(id: number, entity: Partial<ChapterEntity>): Promise<void> {
    await this.chapterRepository.updateRow(id, entity);
    return;
  }
  /**
   * 연재 신청 => 연재를 신청하기 하면 Chpater 상태가 review 로 넘어간다
   */
  async applyChapter(id: number): Promise<void> {
    const chapter = await this.findOneChapterId(id);
    chapter.changeStatus(ChapterStatusEnum.REVIEW);
    await this.save(chapter);
  }
  async changeTitle(id: number, dto: ChangeTitleDto): Promise<void> {
    const chapter = await this.findOneChapterId(id);
    chapter.changeTitle(dto.title);
    await this.save(chapter);
  }
  async delete(id: number): Promise<void> {
    const chapter = await this.chapterRepository.findByoptions({
      where: { id },
    });
    // 아래 validation 반드시 필요. 추후 구현
    // if (novelText.createdBy.id !== user.id) {
    //   throw new ConflictException('작성자가 아닙니다.')
    // }
    await this.chapterRepository.deleteRow(id);
    return;
  }

  async findChapterText(dto: FindByNovelRoomIdDto): Promise<any> {
    const [chapters, totalCount] =
      await this.chapterRepository.findChpaterByRoomIdAndCount(
        dto.novelRoomId,
        dto,
      );
    const items = chapters.map(
      (chapter) => new FindChapterByNovelRoomIdResponseDto(chapter),
    );
    return new PagingationResponse(totalCount, dto.chuckSize, items);
  }

  private findOneChapterId(id: number): Promise<ChapterEntity> {
    return this.chapterRepository.findOneByOptions({
      where: {
        id,
      },
    });
  }
}
