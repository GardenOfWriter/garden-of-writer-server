import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { ChapterDto } from '../chapter.dto';
import { ChapterStatusEnum } from '../../entities/enums/chapter-status.enum';

export class CreateChapterRequestDto extends PickType(ChapterDto, [
  'title',
  'novelRoomId',
]) {
  toEntity(user: userEntity): Partial<ChapterEntity> {
    const entity = ChapterEntity.of(
      this.novelRoomId,
      ChapterStatusEnum.WRITING,
      this.title,
      user,
    );
    return entity;
  }
}
