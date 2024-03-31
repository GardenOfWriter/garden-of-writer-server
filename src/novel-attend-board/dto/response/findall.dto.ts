import {
  NovelRoomType,
  NovelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { convertDayFormat } from '@app/commons/util/date.util';
import {
  RoomCategoryDescription,
  findCategoryName,
} from '@app/novel-room/entities/enum/novel-room-category.enum';

export class FindAllNovelAttendBoardDto {
  private _roomId: number;
  private _roomTitle: string;
  private _roomCreatedAt: Date;
  private _viewCount: number;
  private _boardTitle: string;
  private _writers: NovelWriterEntity[];
  private _category: number;
  private _type: NovelRoomType;
  private _like: number;
  constructor(user: UserEntity, room: NovelRoomEntity) {
    this._roomId = room.id;
    this._roomTitle = room.title;
    this._boardTitle = room.novelAttendBoard?.title;
    this._roomCreatedAt = room.createdAt;
    this._writers = room.novelWriter;
    this._category = room.category;
    this._type = room.type;
    this._like = room.novelAttendBoard.boardLike.length;
  }

  @ApiProperty({
    example: '공방 ID',
    description: '공방 ID',
  })
  @Expose()
  get roomId(): number {
    return this._roomId;
  }
  @ApiProperty({
    example: '소설 공방 제목',
    description: '소설 공방 제목 입니다.',
  })
  @Expose()
  get roomTitle(): string {
    return this._roomTitle;
  }
  @ApiProperty({
    example: '공방 참여 게시글 제목',
    description: '공방 참여 게시글 제목 입니다.',
  })
  @Expose()
  get boardTitle(): string {
    return this._boardTitle;
  }

  @ApiProperty({
    example: 0,
    description: '게시글 조회수',
  })
  @Expose()
  get viewCount(): number {
    return this._viewCount || 0;
  }
  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '공방 게시일',
  })
  @Expose()
  get roomCreatedAt(): Date {
    return this._roomCreatedAt;
  }
  @ApiProperty({
    example: 5,
    description: '좋아요 수',
  })
  @Expose()
  get like() {
    return this._like || 0;
  }
  @ApiProperty({ ...RoomCategoryDescription })
  @Expose({ name: 'category' })
  get category(): { id: number; name: string } {
    return { id: this._category, name: findCategoryName(this._category) };
  }
  @ApiProperty({
    example: 2,
    description: '참여 작가 수',
  })
  @Expose()
  get currentWriterCnt() {
    return this._writers.length;
  }
  @ApiProperty({
    enum: NovelRoomTypeEnum,
    example: '소설 공방 타입',
    description: `${NovelRoomTypeEnum.SOLO}   : 혼자
                  ${NovelRoomTypeEnum.GROUP2} : 2명 
                  ${NovelRoomTypeEnum.GROUP3} : 3명
                  ${NovelRoomTypeEnum.GROUP3} : 3명
                  ${NovelRoomTypeEnum.GROUP4} : 4명
                  ${NovelRoomTypeEnum.GROUP5} : 5명`,
  })
  @Expose()
  get roomType(): NovelRoomType {
    return this._type;
  }
}
