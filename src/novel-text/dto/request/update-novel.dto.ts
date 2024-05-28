import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../user/entities/user.entity';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { NovelTextDto } from '../novel-text.dto';
import { NovelTextStatusEnum } from '@app/novel-text/entities/enum/novel-text-status.enum';

export class UpdateTextNovelRequestDto extends PickType(NovelTextDto, ['content', 'chapterId']) {
  toEntity(id: number, user: UserEntity): Partial<NovelTextEntity> {
    const entity = NovelTextEntity.of(this.chapterId, NovelTextStatusEnum.TEMP_SAVE, this.content, user);
    entity.id = id;
    return entity;
  }
}
