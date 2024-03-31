import {
  NovelRoomCategoryType,
  findCategoryName,
} from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { NovelRoomType } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RoomCategoryDescription } from '../../entities/enum/novel-room-category.enum';
import { RoomTypeDescription } from '../../entities/enum/novel-room-type.enum';
import { NovelRoomStatuDescription } from '../../entities/enum/novel-room-status.enum';
import { convertDayFormat } from '../../../commons/util/date.util';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';

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
  private _completedAt: string;
  private _status: NovelRoomStatusType;
  private _novelTags: NovelTagEntity[];

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
    this._novelTags = room.novelTag;
  }

  @ApiProperty({
    example: 1,
    description: '공방 id',
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
  @Expose({ name: 'category' })
  get category(): { id: number; name: string } {
    return { id: this._category, name: findCategoryName(this._category) };
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
    ...NovelRoomStatuDescription,
  })
  @Expose()
  get status() {
    return this._status;
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
    example: convertDayFormat(new Date()),
    description: '공방 생성일',
  })
  @Expose()
  get createdAt() {
    return this._createdAt;
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '공방 수정일',
  })
  @Expose()
  get updatedAt() {
    return this._updatedAt;
  }
  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '연재 완료일',
  })
  @Expose()
  get completedAt() {
    return this._completedAt;
  }
  @ApiProperty({
    example: ['공방 태그'],
    description: '공방 태그',
  })
  @Expose()
  get novelTag(): string[] {
    return this._novelTags.map((novelTag) => {
      return novelTag.tag.name;
    });
  }
}
