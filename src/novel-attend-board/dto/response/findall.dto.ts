import {
  NovelRoomType,
  novelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { NovelRoomEntity } from '../../../novel-room/entities/novel-room.entity';
import { NovelWriterEntity } from '../../../novel-writer/entities/novel-writer.entity';
import { UserEntity } from '../../../user/entities/user.entity';

export class FindAllNovelAttendBoardDto {
  private _roomTitle: string;
  private _roomCreatedAt: Date;
  private _viewCount: number;
  private _boardTitle: string;
  private _writers: NovelWriterEntity[];
  private _category: number;
  private _type: NovelRoomType;
  constructor(user: UserEntity, room: NovelRoomEntity) {
    this._roomTitle = room.title;
    this._boardTitle = room.novelAttendBoard?.title;
    this._roomCreatedAt = room.createdAt;
    this._writers = room.novelWriter;
    this._category = room.category;
    this._type = room.type;
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
    description: '게시글 조회수 입니다.',
  })
  @Expose()
  get viewCount(): number {
    return this._viewCount || 0;
  }
  @ApiProperty({
    example: new Date(),
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
    return 5;
  }
  @ApiProperty({
    example: '소설 공방 카테고리',
    description: 'category',
  })
  @Expose()
  get category() {
    return this._category;
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
    enum: novelRoomTypeEnum,
    example: '소설 공방 타입',
    description: `${novelRoomTypeEnum.SOLO} : 혼자 : ${novelRoomTypeEnum.GROUP2} : 2명 group3 : 3명`,
  })
  @Expose()
  get roomType() {
    return this._type;
  }
}
