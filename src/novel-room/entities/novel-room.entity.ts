import { PrimaryGeneratedPkWithMetaTimeEntity } from '@app/commons/entities/primary-generated-pk-with-meta-time.entity';
import {
  NovelRoomCategoryType,
  NovelRoomCategoryEnum,
} from '@app/novel-room/entities/enum/novel-room-category.enum';
import {
  NovelRoomType,
  NovelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';

import { UserEntity } from '@app/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { NovelAttendBoardEntity } from '../../novel-attend-board/entities/novel-attend-board.entity';
import { NovelWriterEntity } from '../../novel-writer/entities/novel-writer.entity';

import {
  NovelRoomStatusEnum,
  NovelRoomStatusType,
} from './enum/novel-room-status.enum';

@Entity({ name: 'novel-room', schema: 'gow-server' })
export class NovelRoomEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  //작가정원
  @Column({
    type: 'enum', //
    enum: Object.values(NovelRoomTypeEnum),
    default: NovelRoomTypeEnum.SOLO,
  })
  type: NovelRoomType;

  //제목
  @Column({ length: 255, unique: true })
  title: string;

  //한줄소개
  @Column('varchar', { length: 255 })
  subTitle: string;

  //카테고리
  @Column({
    type: 'enum', //
    enum: NovelRoomCategoryEnum,
    default: NovelRoomCategoryEnum.NORMAL,
  })
  category: NovelRoomCategoryType;

  //등장인물
  @Column('varchar', { length: 255, nullable: true })
  character: string | null;

  //줄거리
  @Column('varchar', { length: 255, nullable: true })
  summary: string | null;

  // 연재 완료일
  @Column('timestamp', { nullable: true })
  completedAt: Date;

  // 소설 공방 상태
  @Column({
    type: 'enum', //
    enum: NovelRoomStatusEnum,
    default: NovelRoomStatusEnum.SERIES,
  })
  status: NovelRoomStatusType;
  /**
   *  추후에 createdBy로 옮기는걸 제안
   */
  @ManyToOne(() => UserEntity, (user) => user.novelRooms)
  user: UserEntity;

  @OneToMany((_type) => NovelWriterEntity, (writer) => writer.novelRoom)
  novelWriter: NovelWriterEntity[];

  @OneToOne((_type) => NovelAttendBoardEntity, (board) => board.noveRoom)
  novelAttendBoard: NovelAttendBoardEntity;

  @ManyToMany(() => NovelTagEntity)
  @JoinTable()
  tags: NovelTagEntity[];

  static of(
    type: NovelRoomType,
    title: string,
    subTitle: string,
    category: NovelRoomCategoryType,
    character: string,
    summary: string,
    user: UserEntity,
  ) {
    const room = new NovelRoomEntity();
    room.type = type;
    room.title = title;
    room.subTitle = subTitle;
    room.category = category;
    room.character = character;
    room.summary = summary;
    room.user = user;
    return room;
  }
}
