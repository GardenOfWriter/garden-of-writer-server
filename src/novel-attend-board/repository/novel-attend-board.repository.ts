import { Provider } from '@nestjs/common';
import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';
import { NovelAttendBoardRepositoryImpl } from './novel-attend-board.repository.impl';

export const NovelAttendBoardRepositryToken = 'NovelAttendBoardRepository';
export const NovelAttendBoardRepositoryProvider: Provider = {
  provide: NovelAttendBoardRepositryToken,
  useClass: NovelAttendBoardRepositoryImpl,
};
export interface NovelAttendBoardRepository {
  addRow(entity: Partial<NovelAttendBoardEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<NovelAttendBoardEntity>): Promise<void>;
  findWithNovelRoom(): Promise<[NovelAttendBoardEntity[], number]>;
}
