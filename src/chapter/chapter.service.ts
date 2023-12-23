import { Inject, Injectable, Logger } from '@nestjs/common';
import { FindByNovelRoomIdResponseDto } from './dto/response/findbychapter-id.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { ChapterRepository } from './repository/chapter.repository';

@Injectable()
export class ChapterService {
  private logger = new Logger(ChapterService.name);

  constructor(
    @Inject(ChapterRepository)
    private chapterRepository: ChapterRepository,
  ) {}
  async create(entity: Partial<ChapterEntity>): Promise<void> {
    await this.chapterRepository.addRow(entity);
    return;
  }
  async update(id: number, entity: Partial<ChapterEntity>): Promise<void> {
    await this.chapterRepository.updateRow(id, entity);
    return;
  }

  async delete(id: number): Promise<void> {
    const chapter = await this.chapterRepository.findByoptions({
      where: { id },
    });
    // 아래 validation 반드시 필요. 추후 구현
    // if (novelText.createdBy.id !== user.id) {
    //   throw new ConflictException('작성자가 아닙니다.');
    // }
    await this.chapterRepository.deleteRow(id);
    return;
  }

  async findChapterText(novelRoomId: number) {
    const texts = await this.chapterRepository.findByoptions({
      where: { novelRoom: { id: novelRoomId } },
    });
    return texts.map((text) => new FindByNovelRoomIdResponseDto(text));
  }
}
