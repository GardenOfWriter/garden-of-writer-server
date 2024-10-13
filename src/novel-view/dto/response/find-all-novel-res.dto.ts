import { convertDayFormat } from '@app/commons/util/date.util';
import { findCategoryName, RoomCategoryDescription } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomType, RoomTypeDescription } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export enum NovelRoomStatusReqEnum {
  SERIES = 'series',
  COMPLETE = 'complete',
  ALL = 'all',
}

export class FindAllNovelViewResDto {
  constructor(novelRoom: NovelRoomEntity) {
    const novelWriters = novelRoom.novelWriter;
    const host = novelWriters.find((writer) => writer.isHost());
    this.type = novelRoom.type;
    this.category = { id: novelRoom.category, name: findCategoryName(novelRoom.category) };
    this.roomId = novelRoom.id;
    this.roomTitle = novelRoom.title;
    this.roomCreatedAt = novelRoom.createdAt;
    this.bookCover = novelRoom.bookCover;
    this.writerName = `${host.user.nickname} 외 ${novelWriters.length - 1}명`;
  }
  @Expose()
  @AutoMap()
  @ApiProperty({
    example: 1,
    description: '공방 id',
  })
  readonly roomId: number;

  @Expose()
  @AutoMap()
  @ApiProperty({
    example: '공방 제목',
    description: '공방 제목',
  })
  readonly roomTitle: string;

  @Expose()
  @AutoMap()
  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '공방 생성일',
  })
  readonly roomCreatedAt: Date;

  @Expose()
  @AutoMap()
  @ApiProperty({})
  readonly viewCount: number;

  @Expose()
  @AutoMap()
  @ApiProperty({ ...RoomCategoryDescription })
  readonly category: { id: number; name: string };

  @Expose()
  @AutoMap()
  @ApiProperty({
    ...RoomTypeDescription,
  })
  readonly type: NovelRoomType;

  @Expose()
  @AutoMap()
  @ApiProperty({
    example: 'https://bookcover.com',
    description: '북커버',
  })
  readonly bookCover: string;

  @Expose()
  @AutoMap()
  @ApiProperty({
    example: '용진외 4명',
    description: '작가 이름',
  })
  readonly writerName: string;
}
