import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateNovelTextRequestDto } from './dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from './dto/request/update-novel.dto';
import { NovelTextRepository } from './repository/novel-text.repository';

@Injectable()
export class NovelTextService {
  private logger = new Logger(NovelTextService.name);

  constructor(
    @Inject(NovelTextRepository)
    private novelTextRepository: NovelTextRepository,
  ) {}
  create(dto: CreateNovelTextRequestDto) {
    const entity = dto.toEntity();
    this.logger.log('entity', entity, 'type', typeof entity);
    return entity;
  }
  async update(dto: UpdateTextNovelRequestDto) {
    const entity = dto.toEntity();
    await this.novelTextRepository.updateRow(dto.id, entity);
    return entity;
  }

  async delete(id: number) {
    await this.novelTextRepository.deleteRow(id);
  }

  async findChapterText(chapterId: number) {
    const texts = await this.novelTextRepository.findByChapterId(chapterId);
    return texts;
  }
}
