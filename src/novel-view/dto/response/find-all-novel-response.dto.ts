import { NovelRoomType } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export enum NovelRoomStatusReqEnum {
  SERIES = 'series',
  COMPLETE = 'complete',
  ALL = 'all',
}

export class FindAllNovelViewResponseDto {
  constructor(novelRoom: NovelRoomEntity) {
    this.type = novelRoom.type;
    this.category = novelRoom.category;
    this.roomId = novelRoom.id;
    this.roomTitle = novelRoom.title;
    this.roomCreatedAt = novelRoom.createdAt;
    this.bookCover = novelRoom.bookCover;
    const novelWriters = novelRoom.novelWriter;
    const host = novelWriters.find((writer) => writer.isHost());
    this.writerName = `${host.user.nickname} 외 ${novelWriters.length - 1}명`;
  }
  @Expose()
  @ApiProperty({})
  readonly roomId: number;

  @Expose()
  @ApiProperty({})
  readonly roomTitle: string;

  @Expose()
  @ApiProperty({})
  readonly roomCreatedAt: Date;

  @Expose()
  @ApiProperty({})
  readonly viewCount: number;

  @Expose()
  @ApiProperty({})
  readonly category: number;

  @Expose()
  @ApiProperty({})
  readonly type: NovelRoomType;

  @Expose()
  @ApiProperty({})
  readonly bookCover: string;

  @Expose()
  @ApiProperty({})
  readonly writerName: string;
}
