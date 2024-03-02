import {
  NovelRoomStatusEnum,
  NovelRoomStatusType,
} from '@app/novel-room/entities/enum/novel-room-status.enum';
import { Expose } from 'class-transformer';
import { NovelWriterEntity } from '../../../novel-writer/entities/novel-writer.entity';
import { UserEntity } from '../../../user/entities/user.entity';
import { NovelRoomEntity } from '../../entities/novel-room.entity';
import { NovelRoomType } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { ApiProperty } from '@nestjs/swagger';

import { RoomCategoryDescription } from '../../entities/enum/novel-room-category.enum';
import { RoomTypeDescription } from '../../entities/enum/novel-room-type.enum';
import { WriterCategoryEnum } from '@app/novel-writer/entities/enums/writer-category.enum';
import { NovelRoomStatuDescription } from '../../entities/enum/novel-room-status.enum';

export class FindAttendStatusNovelRoomDto {
  private _no: number;
  private _category: number;
  private _title: string;
  private _createdAt: Date;
  private _completedAt: Date; // 완결일
  private _writers: NovelWriterEntity[];
  private _type: NovelRoomType;
  private _id: number;
  private _currentWriter: any;
  private _status: NovelRoomStatusType;
  private _me: NovelWriterEntity;
  constructor(user: UserEntity, room: NovelRoomEntity) {
    this._id = room.id;
    this._category = room.category;
    this._title = room.title;
    this._createdAt = room.createdAt;
    this._completedAt = room.completedAt;
    this._type = room.type;
    this._writers = room.novelWriter;
    this._me = room.novelWriter.filter(
      (writer) => writer.user.id === user.id,
    )[0];
    this._status = room.status;
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
  get category(): number {
    return this._category;
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
    example: new Date(),
    description: '개설일',
  })
  @Expose({ name: 'createdAt' })
  get createdAt(): Date {
    return this._createdAt;
  }

  @ApiProperty({
    example: new Date(),
    description: '완결일',
  })
  @Expose({ name: 'completionAt' })
  get completionAt(): Date {
    return this._completedAt;
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
  /**
   *  현 작성자
   *  TODO: 수정 필요
   */
  @ApiProperty({
    example: 3,
    description: '현 작성자',
  })
  @Expose({ name: 'currentWriter' })
  get currentWriter(): string {
    return this._writers[0].user.nickname;
  }
  // /**
  //  *  공방 상태
  //  */
  @ApiProperty({
    ...NovelRoomStatuDescription,
  })
  @Expose({ name: 'status' })
  get status(): NovelRoomStatusType {
    return this._status;
  }
  @ApiProperty({
    example: new Date(),
    description: '참여 승인/반려일',
  })
  @Expose({ name: 'notifiedAt' })
  get notifiedAt(): Date | null {
    return this._me.notifiedAt || null;
  }

  @ApiProperty({
    example: new Date(),
    description: '참여 승인/반려일',
  })
  @Expose({ name: 'exitedAt' })
  get exitedAt(): Date | null {
    return this._me.exitedAt || null;
  }
}
