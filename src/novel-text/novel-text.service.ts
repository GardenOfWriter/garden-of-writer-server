import { Inject, Injectable, Logger, ConflictException } from '@nestjs/common';
import { CreateNovelTextRequestDto } from './dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from './dto/request/update-novel.dto';
import { NovelTextRepository } from './repository/novel-text.repository';
import { NovelTextEntity } from './entities/novel-text.entity';
import { userEntity } from '../user/entities/user.entity';
import { FindByChapterIdResponseDto } from './dto/response/findbychapter-id.dto';

@Injectable()
export class NovelTextService {
  private logger = new Logger(NovelTextService.name);

  constructor(
    @Inject(NovelTextRepository)
    private novelTextRepository: NovelTextRepository,
  ) {}
  async create(entity: Partial<NovelTextEntity>): Promise<void> {
    await this.novelTextRepository.addRow(entity);
    return;
  }
  async update(id: number, entity: Partial<NovelTextEntity>): Promise<void> {
    await this.novelTextRepository.updateRow(id, entity);
    return;
  }

  async delete(id: number, user: userEntity): Promise<void> {
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
