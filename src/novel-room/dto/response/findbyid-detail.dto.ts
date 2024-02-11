import {
  NovelRoomCategoryEnum,
  NovelRoomCategoryType,
} from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import {
  NovelRoomType,
  NovelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindByRoomIdDetailDto {
  private _createdAt: Date;
  private _updatedAt: Date;
  private _id: number;
  private _type: NovelRoomType;
  private _title: string;
  private _subTitle: string;
  private _category: NovelRoomCategoryType;
  private _character: string;
  private _summary: string;
  private _completedAt: Date;
  private _status: NovelRoomStatusType;

  constructor(room: NovelRoomEntity) {
    this._id = room.id;
    this._title = room.title;
    this._subTitle = room.subTitle;
    this._category = room.category;
    this._character = room.character;
    this._summary = room.summary;
    this._status = room.status;
    this._completedAt = room.completedAt;
  }

  @ApiProperty({
    example: 1,
    description: '공방 row id',
  })
  get id() {
    return this._id;
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
  get type() {
    return this._type;
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
  get category() {
    return this._category;
  }

  @ApiProperty({
    example: '등장인물1',
    description: '등장인물',
  })
  get character() {
    return this._character;
  }

  @ApiProperty({
    example: '줄거리',
    description: '줄거리',
  })
  get summary() {
    return this._summary;
  }
  @ApiProperty({
    example: '공방 제목',
    description: '공방 제목',
  })
  get title() {
    return this._title;
  }
  @ApiProperty({
    example: 1,
    description: '한줄소개',
  })
  get subTitle() {
    return this._subTitle;
  }

  @ApiProperty({
    example: new Date(),
    description: '공방 생성일',
  })
  get createdAt() {
    return this._createdAt;
  }

  @ApiProperty({
    example: new Date(),
    description: '공방 수정일',
  })
  get updatedAt() {
    return this._updatedAt;
  }
}
