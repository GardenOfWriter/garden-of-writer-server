import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { ChapterDto } from '../chapter.dto';

export class CreateChapterRequestDto extends PickType(ChapterDto, [
  'status',
  'name',
  'novelRoomId',
]) {
  toEntity(user: userEntity): Partial<ChapterEntity> {
    const entity = ChapterEntity.of(
      this.novelRoomId,
      this.status,
      this.name,
      user,
    );
    return entity;
  }
}
