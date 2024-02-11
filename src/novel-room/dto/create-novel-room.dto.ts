import {
  NovelRoomCategoryType,
  NovelRoomCategoryEnum,
} from '@app/novel-room/entities/enum/novel-room-category.enum';
import {
  NovelRoomType,
  NovelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NovelRoomEntity } from '../entities/novel-room.entity';

export class CreateNovelRoomDto {
  @ApiProperty({
    example: '공방 1',
    description: '소설 공망 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '공방 한줄소개 1',
    description: '소설 한줄소개',
  })
  @IsString()
  subTitle: string;

  @ApiProperty({
    example: `${NovelRoomCategoryEnum.ACTION_MARTIAL_ARTS}`,
    description: '일반소설 | 코믹',
  })
  @IsEnum(NovelRoomCategoryEnum, {
    message: 'category 는 1,2,3,4,5,6,7,8,9 에서 입력 가능합니다.',
  })
  category: NovelRoomCategoryType;

  @ApiProperty({
    enum: NovelRoomTypeEnum,
    example: NovelRoomTypeEnum.GROUP2,
    description: '작가 정원',
  })
  @IsNotEmpty()
  @IsEnum(NovelRoomTypeEnum)
  type: NovelRoomType;

  @ApiProperty({
    example: '등장 인물',
    description: '등장인물',
  })
  @IsNotEmpty()
  character: string;

  @ApiProperty({
    example: '줄거리',
    description: '줄거리',
  })
  @IsNotEmpty()
  summary: string;

  // @ApiProperty({
  //   example: 1,
  //   description: '유저 ID',
  // })
  // @IsNotEmpty()
  private _user: UserEntity;

  setUserId(user: UserEntity) {
    this._user = user;
  }
  getUser(): UserEntity {
    return this._user;
  }
  // request dto -> toEntity -> of method -> entity
  toEntity(): Partial<NovelRoomEntity> {
    return NovelRoomEntity.of(
      this.type,
      this.title,
      this.subTitle,
      this.category,
      this.character,
      this.summary,
      this._user,
    );
  }
}
