import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../user/entities/user.entity';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { NovelTextDto } from '../novel-text.dto';

export class UpdateTextNovelRequestDto extends PickType(NovelTextDto, ['status', 'content', 'chapterId']) {
  toEntity(id: number, user: UserEntity): Partial<NovelTextEntity> {
    const entity = NovelTextEntity.of(this.chapterId, this.status, this.content, user);
    entity.id = id;
    return entity;
  }
}
