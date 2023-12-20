import { NovelTextEntity } from '../entities/novel-text.entity';
export const NovelTextRepository = 'NovelTextRepository';

export interface NovelTextRepository {
  addRow(entity: NovelTextEntity): Promise<void>;
  updateRow(id: number, entity: Partial<NovelTextEntity>): Promise<void>;
  deleteRow(id: number): Promise<void>;
  findByChapterId(chapterId: number): Promise<NovelTextEntity>;
  //   updateStatue(id: number,status: ): Promise<NovelTextEntity>;
}
