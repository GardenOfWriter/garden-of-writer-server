import { PickType } from '@nestjs/swagger';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { CreateNovelRoomDto } from './create-novel-room.dto';
import { NovelRoomTypeEnum } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { UserEntity } from '@app/user/entities/user.entity';

export class UpdateNovelRoomDto extends PickType(CreateNovelRoomDto, [
  'summary',
  'subTitle',
  'novelTags',
  'bookCover',
  'category',
  'character',
  'attendTitle',
  'attendContent',
  'attendOpenKakaoLink',
] as const) {
  toEntity(user: UserEntity): NovelRoomEntity {
    return NovelRoomEntity.of(
      NovelRoomTypeEnum.SOLO, // TODO : type 임시값 어떻게 처리할건지 고민
      '임시 제목',
      this.subTitle,
      this.category,
      this.character,
      this.summary,
      this.bookCover,
      user,
    );
  }
}
