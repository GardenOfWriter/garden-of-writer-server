import { NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { Expose, Exclude } from 'class-transformer';
import { NovelWriterEntity } from '../../../novel-writer/entities/novel-writer.entity';
import { UserEntity } from '../../../user/entities/user.entity';
import { NovelRoomEntity } from '../../entities/novel-room.entity';
import { NovelRoomType } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { RoomCategoryDescription, findCategoryName } from '../../entities/enum/novel-room-category.enum';
import { RoomTypeDescription } from '../../entities/enum/novel-room-type.enum';
import { WriterCategoryDescription, WriterCategoryEnum } from '@app/novel-writer/entities/enums/writer-category.enum';
import { NovelRoomStatuDescription } from '../../entities/enum/novel-room-status.enum';
import { convertDayFormat } from '@app/commons/util/date.util';
import { WriterStatusDescription } from '@app/novel-writer/entities/enums/writer-status.enum';
import { getSize } from '../../../commons/util/data.helper';

export class FindAttendStatusNovelRoomDto {
  @Exclude() private _category: number;
  @Exclude() private _title: string;
  @Exclude() private _createdAt: Date;
  @Exclude() private _completedAt: string; // 완결일
  @Exclude() private _writers: NovelWriterEntity[];
  @Exclude() private _type: NovelRoomType;
  @Exclude() private _id: number;
  @Exclude() private _bookCover: string;
  @Exclude() private _status: NovelRoomStatusType;
  @Exclude() private _requestUser: NovelWriterEntity;
  @Exclude() private _attendWriters: NovelWriterEntity[];

  constructor(user: UserEntity, room: NovelRoomEntity, attendWriters?: NovelWriterEntity[]) {
    this._id = room.id;
    this._category = room.category;
    this._title = room.title;
    this._createdAt = room.createdAt;
    this._type = room.type;
    this._writers = room.novelWriter;
    this._requestUser = room.novelWriter.filter((writer) => writer.user.id === user.id)[0];
    this._status = room.status;
    this._completedAt = room.completedAt;
    this._attendWriters = attendWriters;
  }
  @ApiProperty({
    example: 1,
    description: '소설 공방 ID',
  })
  @Expose({ name: 'id' })
  get id(): number {
    return this._id;
  }
  @ApiProperty({ ...RoomCategoryDescription })
  @Expose({ name: 'category' })
  get category(): { id: number; name: string } {
    return { id: this._category, name: findCategoryName(this._category) };
  }

  @ApiProperty({
    example: '소설 공방 제목',
    description: '공방 1',
  })
  @Expose({ name: 'title' })
  get title(): string {
    return this._title;
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '개설일',
  })
  @Expose({ name: 'createdAt' })
  get createdAt(): Date {
    return this._createdAt;
  }

  @ApiProperty({
    ...WriterStatusDescription,
  })
  @Expose({ name: 'writerStatus' })
  get writerStatus(): string {
    return this._requestUser.status;
  }

  @ApiProperty({
    ...WriterCategoryDescription,
  })
  @Expose({ name: 'writerCategory' })
  get writerCategory(): string {
    return this._requestUser.category;
  }

  @ApiProperty({ ...RoomTypeDescription })
  @Expose({ name: 'type' })
  get type(): NovelRoomType {
    return this._type;
  }

  @ApiProperty({
    example: 3,
    description: '공방의 참여중인 작가 수(정원에 포함)',
  })
  @Expose({ name: 'currentAttendCnt' })
  get currentAttendCnt(): number {
    return getSize(this._attendWriters);
  }

  @ApiProperty({
    example: 'http://bookcoverlink',
    description: '북 커버 링크',
  })
  @Expose({ name: 'bookCover' })
  get bookCover(): string {
    return this._bookCover;
  }

  @ApiProperty({
    example: 3,
    description: '현 작성자',
  })
  @Expose({ name: 'currentWriter' })
  get currentWriter(): string {
    const currentWriter = this._attendWriters.filter((attendWriter) => attendWriter.isCurrentlyWriter())[0];
    return currentWriter?.user.nickname;
  }

  @ApiProperty({
    ...NovelRoomStatuDescription,
  })
  @Expose({ name: 'status' })
  get status(): NovelRoomStatusType {
    return this._status;
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '참여 승인/반려일',
  })
  @Expose({ name: 'notifiedAt' })
  get notifiedAt(): string | null {
    const date = convertDayFormat(this._requestUser.notifiedAt);
    return this._requestUser.notifiedAt ? date : null;
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '참여 승인/반려일',
  })
  @Expose({ name: 'exitedAt' })
  get exitedAt(): string | null {
    const date = convertDayFormat(this._requestUser.exitedAt);
    return this._requestUser.exitedAt ? date : null;
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '연재완결일',
  })
  @Expose({ name: 'completedAt' })
  get complatedAt(): string {
    return this._completedAt;
  }
}
