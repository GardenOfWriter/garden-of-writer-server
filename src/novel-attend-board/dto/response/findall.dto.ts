import { NovelRoomType, NovelRoomTypeEnum } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { convertDayFormat } from '@app/commons/util/date.util';
import { RoomCategoryDescription, findCategoryName } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelAttendBoardEntity } from '@app/novel-attend-board/entities/novel-attend-board.entity';
import { isEmail } from 'class-validator';
import { isEmpty } from 'lodash';

export class FindAllNovelAttendBoardDto {
  private _roomId: number;
  private _roomTitle: string;
  private _roomCreatedAt: Date;
  private _viewCount: number;
  private _boardTitle: string;
  private _writers: NovelWriterEntity[];
  private _category: number;
  private _type: NovelRoomType;
  private _attendBoard: NovelAttendBoardEntity;

  constructor(user: UserEntity, board: NovelAttendBoardEntity) {
    this._roomId = board.id;
    this._roomTitle = board.title;
    this._boardTitle = board?.title;
    this._roomCreatedAt = board.novelRoom.createdAt;
    this._category = board.novelRoom.category;
    this._type = board.novelRoom.type;
    this._attendBoard = board;
    this._writers = board.novelRoom.novelWriter;
    this._viewCount = board.viewCount;
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
    description: '소설공방 개설일',
  })
  @Expose()
  get roomCreatedAt(): Date {
    return this._roomCreatedAt;
  }

  @ApiProperty({
    example: '대표작가 닉네임',
    description: '대표작가',
  })
  @Expose()
  get host(): string {
    const hostWriter = this._writers.find((writer) => writer.isHost())[0];
    if (isEmpty(hostWriter)) return '대표작가 없음';
    return hostWriter.user.nickname;
  }
  @ApiProperty({
    example: 5,
    description: '좋아요 수',
  })
  @Expose()
  get likeCount() {
    if (!this._attendBoard) return 0;
    return this._attendBoard.boardLike.length || 0;
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
  get currentAttendCnt() {
    const attendWriters = this._writers.filter((writer) => writer.isStatusAttending());
    return attendWriters.length;
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
