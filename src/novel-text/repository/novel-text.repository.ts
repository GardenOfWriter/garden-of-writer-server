import { FindOneOptions } from 'typeorm';
import { NovelTextEntity } from '../entities/novel-text.entity';

export const NovelTextRepository = 'NovelTextRepository';

export interface NovelTextRepository {
  addRow(entity: Partial<NovelTextEntity>): Promise<number>;
  updateRow(id: number, entity: Partial<NovelTextEntity>): Promise<void>;
  deleteRow(id: number): Promise<void>;
  findByChapterId(
    options: FindOneOptions<NovelTextEntity>,
  ): Promise<NovelTextEntity[]>;

  //   updateStatue(id: number,status: ): Promise<NovelTextEntity>;
}
