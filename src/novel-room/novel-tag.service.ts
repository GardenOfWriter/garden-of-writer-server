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
    const tagEntities = await Promise.all(
      tags.map(async (tag) => {
        const checkTag = await this.tagRepository.findOne({
          where: { name: tag },
        });
        if (!checkTag) {
          const entity = TagEntity.of(tag);
          const saveTag = await this.tagRepository.save(entity);
          return saveTag;
        }
        return checkTag;
      }),
    );
    tagEntities.map(async (tagEntity) => {
      const novelTagEntity = NovelTagEntity.of(roomId, tagEntity.id);
      await this.novelTagRepository.save(novelTagEntity);
    });
  }
}
