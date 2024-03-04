import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';
import { TagEntity } from '@app/novel-tag/entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NovelTagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(NovelTagEntity)
    private readonly novelTagRepository: Repository<NovelTagEntity>,
  ) {}

  async createTag(tags: string[], roomId: number) {
    await Promise.all(
      tags.map(async (tag) => {
        const entity = await this.tagRepository.findOne({
          where: { name: tag },
        });
        if (!entity) {
          const tagEntity = TagEntity.of(tag);
          await this.tagRepository.save(tagEntity);
          const novelTagEntity = NovelTagEntity.of(roomId, tagEntity.id);
          await this.novelTagRepository.save(novelTagEntity);
        }
        return tags;
      }),
    );
  }
}
