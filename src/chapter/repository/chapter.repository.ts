import { FindOneOptions } from 'typeorm';
import { ChapterEntity } from '../entities/chapter.entity';

export const ChapterRepository = 'ChapterRepository';

export interface ChapterRepository {
  addRow(entity: Partial<ChapterEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<ChapterEntity>): Promise<void>;
  deleteRow(id: number): Promise<void>;
  findByoptions(
    options: FindOneOptions<ChapterEntity>,
  ): Promise<ChapterEntity[]>;

  //   updateStatue(id: number,status: ): Promise<NovelTextEntity>;
}
