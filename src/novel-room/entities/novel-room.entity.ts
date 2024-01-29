import { PrimaryGeneratedPkWithMetaTimeEntity } from '@app/commons/entities/primary-generated-pk-with-meta-time.entity';
import {
  NovelRoomCategory,
  novelRoomCategoryEnum,
} from '@app/novel-room/entities/enum/novel-room-category.enum';
import {
  NovelRoomType,
  novelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { NovelAttendBoardEntity } from '../../novel-attend-board/entities/novel-attend-board.entity';
import { NovelWriterEntity } from '../../novel-writer/entities/novel-writer.entity';
import {
  NovelRoomStatusEnum,
  NovelRoomStatusType,
} from './enum/novel-room-status.enum';

@Entity({ name: 'novel-room', schema: 'gow-server' })
export class NovelRoomEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  // @PrimaryGeneratedColumn({
  //   name: 'room_id',
  // })
  // id: number;

  //작가정원
  @Column({
    type: 'enum', //
    enum: Object.values(novelRoomTypeEnum),
    default: novelRoomTypeEnum.SOLO,
  })
  type: NovelRoomType;

  //제목
  @Column({ length: 255, unique: true })
  title: string;

  //한줄소개
  @Column('varchar', { length: 255, unique: true })
  subTitle: string;

  //카테고리
  @Column({
    type: 'enum', //
    enum: novelRoomCategoryEnum,
    default: novelRoomCategoryEnum.NORMAL,
  })
  category: NovelRoomCategory;

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

  static of(
    type: NovelRoomType,
    title: string,
    subTitle: string,
    category: NovelRoomCategory,
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
