import { userEntity } from '@app/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { NovelTextDto } from '../novel-text.dto';

export class CreateNovelTextRequestDto extends PickType(NovelTextDto, [
  'status',
  'content',
  'chapterId',
]) {
  toEntity(user: userEntity): Partial<NovelTextEntity> {
    const entity = NovelTextEntity.of(
      this.chapterId,
      this.status,
      this.content,
      user,
    );
    return entity;
  }
}
