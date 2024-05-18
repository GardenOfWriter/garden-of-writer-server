import { NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { Expose } from 'class-transformer';
import { NovelWriterEntity } from '../../../novel-writer/entities/novel-writer.entity';
import { UserEntity } from '../../../user/entities/user.entity';
import { NovelRoomEntity } from '../../entities/novel-room.entity';
import { NovelRoomType } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  RoomCategoryDescription,
  findCategoryName,
} from '../../entities/enum/novel-room-category.enum';
import { RoomTypeDescription } from '../../entities/enum/novel-room-type.enum';
import { WriterCategoryEnum } from '@app/novel-writer/entities/enums/writer-category.enum';
import { NovelRoomStatuDescription } from '../../entities/enum/novel-room-status.enum';
import { convertDayFormat } from '@app/commons/util/date.util';

export class FindAttendStatusNovelRoomDto {
  private _no: number;
  private _category: number;
  private _title: string;
  private _createdAt: Date;
  private _completedAt: string; // 완결일
  private _writers: NovelWriterEntity[];
  private _type: NovelRoomType;
  private _id: number;
  private _bookCover: string;
  private _status: NovelRoomStatusType;
  private _me: NovelWriterEntity;

  constructor(user: UserEntity, room: NovelRoomEntity) {
    this._id = room.id;
    this._category = room.category;
    this._title = room.title;
    this._createdAt = room.createdAt;
    this._type = room.type;
    this._writers = room.novelWriter;
    this._me = room.novelWriter.filter(
      (writer) => writer.user.id === user.id,
    )[0];
    this._status = room.status;
    this._completedAt = room.completedAt;
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
    example: WriterCategoryEnum.HOST,
    description: `작가구분 = 대표작가 : ${WriterCategoryEnum.HOST},
                           참여작가 : ${WriterCategoryEnum.ATTENDEE},`,
  })
  @Expose({ name: 'writerStatus' })
  get writerStatus(): string {
    return this._me.category;
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
    return this._writers.length;
  }

  @ApiProperty({
    example: 'http://bookcoverlink',
    description: '북 커버 링크',
  })
  @Expose({ name: 'bookCover' })
  get bookCover(): string {
    return this._bookCover;
  }

  /**
   *  TODO: 수정 필요
   */
  @ApiProperty({
    example: 3,
    description: '현 작성자',
  })
  @Expose({ name: 'currentWriter' })
  get currentWriter(): string {
    const currentWriter = this._writers.filter((writer) => {
      return writer.currentlyWriting === true;
    })[0];
    console.log('currentWriter : ', currentWriter);
    return currentWriter.user.nickname;
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
    const date = convertDayFormat(this._me.notifiedAt);
    return this._me.notifiedAt ? date : null;
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '참여 승인/반려일',
  })
  @Expose({ name: 'exitedAt' })
  get exitedAt(): string | null {
    const date = convertDayFormat(this._me.exitedAt);
    return this._me.exitedAt ? date : null;
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
