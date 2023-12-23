import { novelRoomType } from 'src/novel-room/entities/enum/novel-room-type.enum';
import { userEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'novel-room', schema: 'gow-server' })
export class NovelRoomEntity {
  @PrimaryGeneratedColumn({
    name: 'room_id',
  })
  id: number;

  //작가정원
  @Column({
    type: 'enum', //
    enum: novelRoomType,
    default: novelRoomType.Solo,
  })
  type: novelRoomType;

  //제목
  @Column({ length: 255, unique: true })
  title: string;

  //한줄소개
  @Column('varchar', { length: 255, unique: true })
  subTitle: string;

  //카테고리
  @Column('varchar', { length: 255 })
  category: string;

  //등장인물
  @Column('varchar', { length: 255, nullable: true })
  character: string | null;

  //줄거리
  @Column('varchar', { length: 255, nullable: true })
  summary: string | null;

  @ManyToOne(() => userEntity, (user) => user.novelRooms)
  user: userEntity;

  static of(
    type: novelRoomType,
    title: string,
    subTitle: string,
    category: string,
    character: string,
    summary: string,
  ) {
    const room = new NovelRoomEntity();
    room.type = type;
    room.title = title;
    room.subTitle = subTitle;
    room.category = category;
    room.character = character;
    room.summary = summary;
    return room;
  }
}
