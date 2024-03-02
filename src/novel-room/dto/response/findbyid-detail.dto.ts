import {
  NovelRoomCategoryEnum,
  NovelRoomCategoryType,
} from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import {
  NovelRoomType,
  NovelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RoomCategoryDescription } from '../../entities/enum/novel-room-category.enum';
import { RoomTypeDescription } from '../../entities/enum/novel-room-type.enum';

export class FindByRoomIdDetailDto {
  private _createdAt: Date;
  private _updatedAt: Date;
  private _id: number;
  private _type: NovelRoomType;
  private _title: string;
  private _subTitle: string;
  private _category: NovelRoomCategoryType;
  private _character: string;
  private _summary: string;
  private _completedAt: Date;
  private _status: NovelRoomStatusType;

  constructor(room: NovelRoomEntity) {
    this._id = room.id;
    this._title = room.title;
    this._subTitle = room.subTitle;
    this._category = room.category;
    this._character = room.character;
    this._summary = room.summary;
    this._status = room.status;
    this._completedAt = room.completedAt;
    this._createdAt = room.createdAt;
    this._updatedAt = room.updatedAt;
  }

  @ApiProperty({
    example: 1,
    description: '공방 row id',
  })
  @Expose()
  get id() {
    return this._id;
  }

  @ApiProperty({ ...RoomTypeDescription })
  @Expose()
  get type() {
    return this._type;
  }
  @ApiProperty({ ...RoomCategoryDescription })
  @Expose()
  get category() {
    return this._category;
  }

  @ApiProperty({
    example: '등장인물1',
    description: '등장인물',
  })
  @Expose()
  get character() {
    return this._character;
  }

  @ApiProperty({
    example: '줄거리',
    description: '줄거리',
  })
  @Expose()
  get summary() {
    return this._summary;
  }
  @ApiProperty({
    example: '공방 제목',
    description: '공방 제목',
  })
  @Expose()
  get title() {
    return this._title;
  }
  @ApiProperty({
    example: 1,
    description: '한줄소개',
  })
  @Expose()
  get subTitle() {
    return this._subTitle;
  }

  @ApiProperty({
    example: new Date(),
    description: '공방 생성일',
  })
  @Expose()
  get createdAt() {
    return this._createdAt;
  }

  @ApiProperty({
    example: new Date(),
    description: '공방 수정일',
  })
  @Expose()
  get updatedAt() {
    return this._updatedAt;
  }
}
