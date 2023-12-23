import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { NovelWirterDto } from '../novel-writer.dto';
import {
  NovelWriterStatusEnum,
  NovelWriterStatusType,
} from '@app/novel-writer/entities/enums/novel-writer.enum';

export class CreateNovelWriterRequestDto extends PickType(NovelWirterDto, [
  'status',
  'novelRoomId',
]) {
  toEntity(user: userEntity): Partial<NovelWriterEntity> {
    const entity = NovelWriterEntity.of(
      this.novelRoomId,
      NovelWriterStatusEnum.PARTICIPATING_WRITER,
      user,
    );
    return entity;
  }
}
