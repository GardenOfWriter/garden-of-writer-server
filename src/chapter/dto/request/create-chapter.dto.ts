import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { ChapterStatusEnum } from '../../entities/enums/chapter-status.enum';
import { ChapterDto } from '../chapter.dto';

export class CreateChapterRequestDto extends PickType(ChapterDto, ['id'] as const) {
  toEntity(novelRoomId: number, user: UserEntity, no: number): Partial<ChapterEntity> {
    const entity = ChapterEntity.of(novelRoomId, ChapterStatusEnum.WRITING, user, '임시 회차', no);
    return entity;
  }
}
