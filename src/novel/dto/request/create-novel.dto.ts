import { PickType } from '@nestjs/swagger';
import { NovelEntity } from '../../entities/novel.entity';
import { NovelDto } from '../novel.dto';

export class CreateNovelRequestDto extends PickType(NovelDto, [
  'status',
  'content',
  'chapterId',
]) {
  toEntity(): Partial<NovelEntity> {
    const entity = NovelEntity.of(this.chapterId, this.status, this.content);
    return entity;
  }
}
