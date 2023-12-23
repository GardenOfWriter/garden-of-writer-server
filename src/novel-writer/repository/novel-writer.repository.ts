import { FindOneOptions } from 'typeorm';
import { NovelWriterEntity } from '../entities/novel-writer.entity';

export const NovelWriterRepository = 'NovelWriterRepository';

export interface NovelWriterRepository {
  addRow(entity: Partial<NovelWriterEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<NovelWriterEntity>): Promise<void>;
  deleteRow(id: number): Promise<void>;
  findByoptions(
    options: FindOneOptions<NovelWriterEntity>,
  ): Promise<NovelWriterEntity[]>;
  findByNovelRoomId(novelRoomId: number): Promise<NovelWriterEntity[]>;
}
