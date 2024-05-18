import { NovelRoomCategoryType, findCategoryName } from '@app/novel-room/entities/enum/novel-room-category.enum';
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
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { WriterStatusEnum } from '@app/novel-writer/entities/enums/writer-status.enum';
import { WriterCategoryEnum } from '@app/novel-writer/entities/enums/writer-category.enum';

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
  private _writers: NovelWriterEntity[];
  private _user: UserEntity;
  constructor(room: NovelRoomEntity, user: UserEntity) {
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
    this._writers = room.novelWriter;
    this._user = user;
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

  @ApiProperty({
    example: true,
    description: '참여한 방에 방장인지 확인유무 = true 방장,false 참여작가',
  })
  @Expose()
  get writerStatus() {
    const me = this._writers.filter((writer) => writer.user.id === this._user.id)[0];
    if (!me) return WriterCategoryEnum.HOST;
    return me.category;
  }
}
