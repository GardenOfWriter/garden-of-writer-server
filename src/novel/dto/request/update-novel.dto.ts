import { PickType, ApiProperty } from '@nestjs/swagger';
import { NovelEntity } from '../../entities/novel.entity';
import { NovelDto } from '../novel.dto';

export class UpdateNovelRequestDto extends PickType(NovelDto, [
  'status',
  'content',
  'chapterId',
]) {
  @ApiProperty({
    example: '글 Id',
    description: '해당 유저의 임시 저장이 된 글 Id',
  })
  id: number;
  toEntity(): Partial<NovelEntity> {
    const entity = NovelEntity.of(this.chapterId, this.status, this.content);
    return entity;
  }
}
