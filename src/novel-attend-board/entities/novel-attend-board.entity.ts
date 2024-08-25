import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { NovelRoomEntity } from '../../novel-room/entities/novel-room.entity';
import { BoardLikeEntity } from './board-like.entity';

@Entity({ name: 'novel-attend-board' })
export class NovelAttendBoardEntity {
  @PrimaryColumn()
  id: number;

  @OneToOne((_type) => NovelRoomEntity, (room) => room.novelAttendBoard, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  novelRoom: NovelRoomEntity;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column('int', { nullable: true, default: 0 })
  viewCount: number;

  @Column('varchar', { length: 4000 })
  openKakaoLink: string;

  @OneToMany((_type) => BoardLikeEntity, (boardLike) => boardLike.attendBoard)
  boardLike: BoardLikeEntity[];

  static of(roomId: number, title: string, content: string, openKakaoLink: string) {
    const board = new NovelAttendBoardEntity();
    board.novelRoom = { id: roomId } as NovelRoomEntity;
    board.title = title;
    board.content = content;
    board.openKakaoLink = openKakaoLink;
    return board;
  }

  updateBoard(title: string, content: string, openKakaoLink: string) {
    this.title = title;
    this.content = content;
    this.openKakaoLink = openKakaoLink;
  }

  updateViewCounting(): void {
    this.viewCount += 1;
  }
}
