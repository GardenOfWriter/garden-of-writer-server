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
  async save(entity: Partial<ChapterEntity>): Promise<void> {
    const count = await this.chapterRepository.chapterCount(entity.novelRoomId);
    entity.setNextNo(count);
    await this.chapterRepository.saveRow(entity);
    return;
  }
  async update(id: number, entity: Partial<ChapterEntity>): Promise<void> {
    await this.chapterRepository.updateRow(id, entity);
    return;
  }
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
  async delete(id: number, user: UserEntity): Promise<void> {
    await this.chapterRepository.deleteRow(id);
    return;
  }

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
}
