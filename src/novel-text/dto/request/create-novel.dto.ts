import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { NovelTextDto } from '../novel-text.dto';
import { IsNumber } from 'class-validator';
import { NovelTextStatusEnum } from '@app/novel-text/entities/enum/novel-text-status.enum';

export class CreateNovelTextRequestDto extends PickType(NovelTextDto, ['content', 'chapterId']) {
  toEntity(user: UserEntity): Partial<NovelTextEntity> {
    const entity = NovelTextEntity.of(this.chapterId, NovelTextStatusEnum.TEMP_SAVE, this.content, user);
    return entity;
  }
}
