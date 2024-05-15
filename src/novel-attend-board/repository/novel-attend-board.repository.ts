import { Provider } from '@nestjs/common';
import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';
import { NovelAttendBoardRepositoryImpl } from './novel-attend-board.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';
import { BoardLikeEntity } from '../entities/board-like.entity';

export const NovelAttendBoardRepositryToken = 'NovelAttendBoardRepository';
export const NovelAttendBoardRepositoryProvider: Provider = {
  provide: NovelAttendBoardRepositryToken,
  useClass: NovelAttendBoardRepositoryImpl,
};
export interface NovelAttendBoardRepository {
  addRow(entity: Partial<NovelAttendBoardEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<NovelAttendBoardEntity>): Promise<void>;
  deleteRow(id: number): Promise<void>;
  findById(id: number): Promise<NovelAttendBoardEntity>;
  findWithNovelRoom(): Promise<[NovelAttendBoardEntity[], number]>;
  findByIdWhereLikeUser(roomId: number): Promise<NovelAttendBoardEntity>;
  hasBoardLike(userId: number, roomId: number): Promise<boolean>;
  createBoardLike(boardLike: BoardLikeEntity): Promise<void>;
  getByIdBoardLike(roomid: number): Promise<number>;
}
