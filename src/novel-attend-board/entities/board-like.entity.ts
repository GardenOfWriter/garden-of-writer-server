import { Entity, ManyToOne } from 'typeorm';
import { BaseMetaTimeStampEntity } from '@app/commons/entities/base-meta-timestamp.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { NovelAttendBoardEntity } from './novel-attend-board.entity';
import { PrimaryGeneratedPkWithMetaTimeEntity } from '@app/commons/entities/primary-generated-pk-with-meta-time.entity';

@Entity({ name: 'board-like', schema: 'gow-server' })
export class BoardLikeEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  @ManyToOne((_type) => UserEntity, (user) => user.boardLike)
  user: UserEntity;

  @ManyToOne((_type) => NovelAttendBoardEntity, (board) => board.boardLike)
  attendBoard: NovelAttendBoardEntity;

  static of(user: UserEntity, roomId: number) {
    const boardLike = new BoardLikeEntity();
    boardLike.user = user;
    boardLike.attendBoard = { id: roomId } as NovelAttendBoardEntity;
    return boardLike;
  }
}
