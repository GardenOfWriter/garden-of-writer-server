import { PrimaryGeneratedPkWithMetaTimeEntity } from '@app/commons/entities/primary-generated-pk-with-meta-time.entity';
import { NovelRoomCategoryType, NovelRoomCategoryEnum } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomType, NovelRoomTypeEnum } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { NovelAttendBoardEntity } from '../../novel-attend-board/entities/novel-attend-board.entity';
import { NovelWriterEntity } from '../../novel-writer/entities/novel-writer.entity';
import { NovelRoomStatusEnum, NovelRoomStatusType } from './enum/novel-room-status.enum';
import { convertDayFormat, getToDayISO8601 } from '@app/commons/util/date.util';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'novel-room' })
export class NovelRoomEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  //작가정원
  @AutoMap()
  @Column({
    type: 'enum', //
    enum: Object.values(NovelRoomTypeEnum),
    default: NovelRoomTypeEnum.SOLO,
  })
  type: NovelRoomType;

  //제목
  @AutoMap()
  @Column({ length: 255, unique: true })
  title: string;

  //한줄소개
  @AutoMap()
  @Column('varchar', { length: 255 })
  subTitle: string;

  //카테고리
  @AutoMap()
  @Column({
    type: 'enum', //
    enum: NovelRoomCategoryEnum,
    default: NovelRoomCategoryEnum.NORMAL,
  })
  category: NovelRoomCategoryType;

  //등장인물
  @AutoMap()
  @Column('varchar', { length: 255, nullable: true })
  character: string | null;

  //줄거리
  @AutoMap()
  @Column('varchar', { length: 255, nullable: true })
  summary: string | null;

  // 연재 완료일
  @AutoMap()
  @Column('timestamp', {
    nullable: true,
    comment: '연재 완료일',
    transformer: {
      to: (value) => value,
      from: (value) => (value ? convertDayFormat(value) : null),
    },
  })
  completedAt: string;

  @AutoMap()
  @Column({
    type: 'enum', //
    enum: NovelRoomStatusEnum,
    default: NovelRoomStatusEnum.PREPARE,
  })
  status: NovelRoomStatusType;

  @AutoMap()
  @Column('varchar', { nullable: true })
  bookCover: string;

  @AutoMap()
  @ManyToOne(() => UserEntity, (user) => user.novelRooms)
  user: UserEntity;

  @AutoMap()
  @OneToMany((_type) => NovelWriterEntity, (writer) => writer.novelRoom)
  novelWriter: NovelWriterEntity[];

  @AutoMap()
  @OneToOne((_type) => NovelAttendBoardEntity, (board) => board.novelRoom)
  novelAttendBoard: NovelAttendBoardEntity;

  @AutoMap()
  @OneToMany(() => NovelTagEntity, (novelTag) => novelTag.novelRoom)
  novelTag: NovelTagEntity[];

  static of(
    type: NovelRoomType,
    title: string,
    subTitle: string,
    category: NovelRoomCategoryType,
    character: string,
    summary: string,
    bookCover: string,
    user: UserEntity,
  ): NovelRoomEntity {
    const room = new NovelRoomEntity();
    room.type = type;
    room.title = title;
    room.subTitle = subTitle;
    room.category = category;
    room.character = character;
    room.summary = summary;
    room.bookCover = bookCover;
    room.user = user;
    return room;
  }

  /**
   * 연재 완료일 세팅
   */
  setCompletedAt(): void {
    this.completedAt = getToDayISO8601();
    this.status = NovelRoomStatusEnum.COMPLETE;
  }
  checkCompleted(): boolean {
    return this.status === NovelRoomStatusEnum.COMPLETE;
  }
  changeStatus(status: NovelRoomStatusType): void {
    this.status = status;
  }

  updateRoom(updateEntity: Partial<NovelRoomEntity>): void {
    this.subTitle = updateEntity.subTitle;
    this.category = updateEntity.category;
    this.character = updateEntity.character;
    this.summary = updateEntity.summary;
    this.bookCover = updateEntity.bookCover;
  }
}
