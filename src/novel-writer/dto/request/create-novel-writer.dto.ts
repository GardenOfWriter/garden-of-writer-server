import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { NovelWriterCategoryType } from '../../entities/enums/novel-writer-category.enum';
import { NovelWirterDto } from '../novel-writer.dto';

/**
 *  참여 작가로 조인
 */
export class CreateNovelWriterRequestDto extends PickType(NovelWirterDto, [
  'novelRoomId',
]) {
  toEntity(
    user: UserEntity,
    category: NovelWriterCategoryType,
    status: NovelWriterStatusType,
  ): Partial<NovelWriterEntity> {
    const entity = NovelWriterEntity.of(
      this.novelRoomId,
      category,
      status,
      user,
    );
    return entity;
  }
}
