import { NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { Expose } from 'class-transformer';
import { NovelWriterEntity } from '../../../novel-writer/entities/novel-writer.entity';
import { UserEntity } from '../../../user/entities/user.entity';
import { NovelRoomEntity } from '../../entities/novel-room.entity';
import { NovelRoomType } from '@app/novel-room/entities/enum/novel-room-type.enum';

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
  @Expose()
  get id(): number {
    return this._id;
  }
  @Expose({ name: 'category' })
  get category(): number {
    return this._category;
  }
  @Expose({ name: 'title' })
  get title(): string {
    return this._title;
  }
  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }
  @Expose()
  get completionAt(): Date {
    return this._completedAt;
  }
  @Expose()
  get writerStatus(): string {
    return this._me.status;
  }
  /**
   *  공방 타입 (group,group2,group3....)
   *  작가 정원 타입 계산
   *    */
  @Expose({ name: 'type' })
<<<<<<< HEAD
  get type(): number {
=======
  get type(): NovelRoomType {
>>>>>>> 359524b ([bug]roomtype 응답 객체 fix)
    return this._type;
  }
  /**
   * 내가 속한 공방의 작가 수
   */
  @Expose()
  get currentAttendCnt(): number {
    return this._writers.length;
  }
  /**
   *  현 작성자
   *  TODO: 수정 필요
   */
  @Expose()
  get currentWriterCnt(): string {
    return this._writers[0].user.nickname;
  }
  // /**
  //  *  공방 상태
  //  */
  @Expose()
  get status(): NovelRoomStatusType {
    return this._status;
  }
  /**
   * 참여 승인/반려일
   */
  @Expose()
  get notifiedAt(): Date | null {
    return this._me.notifiedAt || null;
  }

  @Expose()
  get exitedAt(): Date | null {
    return this._me.exitedAt || null;
  }
}
