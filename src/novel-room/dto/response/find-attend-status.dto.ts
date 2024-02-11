import {
  NovelRoomStatusEnum,
  NovelRoomStatusType,
} from '@app/novel-room/entities/enum/novel-room-status.enum';
import { Expose } from 'class-transformer';
import { NovelWriterEntity } from '../../../novel-writer/entities/novel-writer.entity';
import { UserEntity } from '../../../user/entities/user.entity';
import { NovelRoomEntity } from '../../entities/novel-room.entity';
import {
  NovelRoomType,
  NovelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { NovelRoomCategoryEnum } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelWriterStatusEnum } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { NovelWriterCategoryEnum } from '@app/novel-writer/entities/enums/novel-writer-category.enum';

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
  @ApiProperty({
    example: NovelRoomCategoryEnum.ACTION_MARTIAL_ARTS,
    description: `카테고리 =  일반소설 : ${NovelRoomCategoryEnum.NORMAL},
                            로맨틱/드라마 : ${NovelRoomCategoryEnum.ROMANCE_DRAMA},
                            코믹 : ${NovelRoomCategoryEnum.COMEDY},
                            시/에시이/수필 : ${NovelRoomCategoryEnum.POETRY_ESSAY},
                            판타지/SF : ${NovelRoomCategoryEnum.FANTASY_SF},
                            퓨전 : ${NovelRoomCategoryEnum.FUSION},
                            액션/무협 : ${NovelRoomCategoryEnum.ACTION_MARTIAL_ARTS},
                            스포츠/학원 : ${NovelRoomCategoryEnum.SPORTS_ACADEMY},
                            공포/추리 : ${NovelRoomCategoryEnum.HORROR_DETECTIVE}`,
  })
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
    example: NovelWriterCategoryEnum.REPRESENTATIVE_WRITER,
    description: `작가구분 = 대표작가 : ${NovelWriterCategoryEnum.REPRESENTATIVE_WRITER},
                           참여작가 : ${NovelWriterCategoryEnum.PARTICIPATING_WRITER},`,
  })
  @Expose({ name: 'writerStatus' })
  get writerStatus(): string {
    return this._me.category;
  }
  @ApiProperty({
    enum: NovelRoomTypeEnum,
    example: NovelRoomTypeEnum.SOLO,
    description: `공방 타입  혼자 : ${NovelRoomTypeEnum.SOLO},
                           2명 : ${NovelRoomTypeEnum.GROUP2},
                           3명 : ${NovelRoomTypeEnum.GROUP3},
                           4명 : ${NovelRoomTypeEnum.GROUP4},
                           5명 : ${NovelRoomTypeEnum.GROUP5}`,
  })
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
    enum: NovelRoomStatusEnum,
    example: NovelRoomStatusEnum.SERIES,
    description: `소설공방 상태 = 연재중 : ${NovelRoomStatusEnum.SERIES},
                             연재완료 : ${NovelRoomStatusEnum.COMPLETE},
                              삭제   : ${NovelRoomStatusEnum.REMOVE},`,
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
