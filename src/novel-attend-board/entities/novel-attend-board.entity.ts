import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { NovelRoomEntity } from '../../novel-room/entities/novel-room.entity';

@Entity({ name: 'novel-attend-board', schema: 'gow-server' })
export class NovelAttendBoardEntity {
  @PrimaryColumn()
  id: number;

  @OneToOne((_type) => NovelRoomEntity, (room) => room.novelAttendBoard, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  noveRoom: NovelRoomEntity;

  @Column({ length: 255, unique: true })
  title: string;

  @Column('text')
  content: string;

  @Column('int', { nullable: true })
  viewCount: string;

  @Column('varchar', { length: 4000 })
  openKakaoLink: string;

  static of(
    roomId: number,
    title: string,
    content: string,
    openKakaoLink: string,
  ) {
    const board = new NovelAttendBoardEntity();
    board.noveRoom = { id: roomId } as NovelRoomEntity;
    board.title = title;
    board.content = content;
    board.openKakaoLink = openKakaoLink;
    return board;
  }
}
