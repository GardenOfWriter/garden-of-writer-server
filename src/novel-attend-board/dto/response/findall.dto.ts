import { NovelRoomType } from '@app/novel-board/entities/enum/novel-room-type.enum';
import { Expose } from 'class-transformer';
import { NovelRoomEntity } from '../../../novel-room/entities/novel-room.entity';
import { NovelWriterCategoryEnum } from '../../../novel-writer/entities/enums/novel-writer-category.enum';
import { NovelWriterEntity } from '../../../novel-writer/entities/novel-writer.entity';
import { userEntity } from '../../../user/entities/user.entity';

export class FindAllNovelAttendBoardDto {
  private _roomTitle: string;
  private _roomCreatedAt: Date;
  private _viewCount: number;
  private _boardTitle: string;
  private _writers: NovelWriterEntity[];
  private _category: string;
  private _type: NovelRoomType;
  constructor(user: userEntity, room: NovelRoomEntity) {
    this._roomTitle = room.title;
    this._boardTitle = room.novelAttendBoard?.title;
    this._roomCreatedAt = room.createdAt;
    this._writers = room.novelWriter;
    this._category = room.category;
    this._type = room.type;
  }
  @Expose()
  get roomTitle(): string {
    return this._roomTitle;
  }
  @Expose()
  get boardTitle(): string {
    return this._boardTitle;
  }
  @Expose()
  get viewCount(): number {
    return this._viewCount || 0;
  }
  @Expose()
  get rpWriterNickname() {
    const rpWriter = this._writers.filter(
      (writer) =>
        writer.category == NovelWriterCategoryEnum.REPRESENTATIVE_WRITER,
    );
    return rpWriter[0].user.nickname;
  }
  @Expose()
  get roomCreatedAt(): Date {
    return this._roomCreatedAt;
  }

  @Expose()
  get like() {
    return 0;
  }
  @Expose()
  get total() {
    return this._category;
  }
  @Expose()
  get currentWriterCnt() {
    return this._writers.length;
  }

  @Expose({ name: 'room_type' })
  get roomType() {
    return this._type;
  }
}
