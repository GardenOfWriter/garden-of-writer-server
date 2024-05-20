import { BoardLikeEntity } from '@app/novel-attend-board/entities/board-like.entity';
import { NovelAttendBoardEntity } from '@app/novel-attend-board/entities/novel-attend-board.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { convertDayFormat } from '../../../commons/util/date.util';
import { NovelRoomType, RoomTypeDescription } from '@app/novel-room/entities/enum/novel-room-type.enum';

export class FindByIdLikeUserDto {
  @Exclude() private _roomId: number;
  @Exclude() private _boardtTitle: string;
  @Exclude() private _boardcContent: string;
  @Exclude() private _viewCount: number;
  @Exclude() private _openKakaoLink: string;
  @Exclude() private _likeCount: number;
  @Exclude() private _hasLike: boolean;
  @Exclude() private _createdAt: Date;
  @Exclude() private _currentAttendCnt: number;
  @Exclude() private _type: NovelRoomType;

  constructor(board: NovelAttendBoardEntity, hasLike: boolean, currentAttendCnt: number) {
    this._roomId = board.id;
    this._createdAt = board.novelRoom.createdAt;
    this._boardtTitle = board.title;
    this._boardcContent = board.content;
    this._openKakaoLink = board.openKakaoLink;
    this._viewCount = board.viewCount;
    this._likeCount = board.boardLike.length;
    this._hasLike = hasLike;
    this._currentAttendCnt = currentAttendCnt;
    this._type = board.novelRoom.type;
  }

  @ApiProperty({
    example: 1,
    description: '공방 ID',
  })
  @Expose({ name: 'roomId' })
  get roomId(): number {
    return +this._roomId;
  }
  @ApiProperty({
    example: '공방 모집글 타이틀',
    description: '공방 모집글 타이틀',
  })
  @Expose({ name: 'boardTitle' })
  get boardTitle(): string {
    return this._boardtTitle;
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '공방 게시일',
  })
  @Expose({ name: 'createdAt' })
  get createdAt(): string {
    return convertDayFormat(this._createdAt);
  }

  @ApiProperty({
    example: '모집글',
    description: '모집글',
  })
  @Expose({ name: 'boardContent' })
  get boardContent(): string {
    return this._boardcContent;
  }
  @ApiProperty({
    example: 3,
    description: '공방의 참여중인 작가 수(정원에 포함)',
  })
  @Expose({ name: 'currentAttendCnt' })
  get currentAttendCnt(): number {
    return this._currentAttendCnt || 0;
  }

  @ApiProperty({ ...RoomTypeDescription })
  @Expose({ name: 'type' })
  get type(): NovelRoomType {
    return this._type;
  }

  @ApiProperty({
    example: '조회수',
    description: '조회수',
  })
  @Expose({ name: 'viewCount' })
  get viewCount(): number {
    return this._viewCount || 0;
  }
  @ApiProperty({
    example: '오픈 카카오 링크 ',
    description: '오픈 카카오 링크',
  })
  @Expose({ name: 'boardOpenKakaoLink' })
  get openKakaoLink(): string {
    return this._openKakaoLink;
  }
  @ApiProperty({
    example: '좋아요수',
    description: '좋아요수',
  })
  @Expose({ name: 'likeCount' })
  get like(): number {
    return this._likeCount || 0;
  }

  @ApiProperty({
    example: '좋아요 유무',
    description: '좋아요 유무',
  })
  @Expose({ name: 'hasLike' })
  get hasLike(): boolean {
    return this._hasLike;
  }
}
