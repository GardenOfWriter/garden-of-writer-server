import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';

export const NovelAttendBoardRepositryToken = 'NovelAttendBoardRepository';
export interface NovelAttendBoardRepository {
  addRow(entity: Partial<NovelAttendBoardEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<NovelAttendBoardEntity>): Promise<void>;
  findWithNovelRoom(): Promise<[NovelAttendBoardEntity[], number]>;
}
