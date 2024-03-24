import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { ChapterStatusEnum } from '../../entities/enums/chapter-status.enum';
import { ChapterDto } from '../chapter.dto';

export class CreateChapterRequestDto extends PickType(ChapterDto, [
  'title',
  'novelRoomId',
]) {
  toEntity(user: UserEntity): Partial<ChapterEntity> {
    const entity = ChapterEntity.of(
      this.novelRoomId,
      ChapterStatusEnum.WRITING,
      user,
      this.title,
    );
    return entity;
  }
}
