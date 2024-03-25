import { FindOneOptions } from 'typeorm';
import { NovelWriterEntity } from '../entities/novel-writer.entity';
import { Provider } from '@nestjs/common';
import { NovelWriterRepositoryImpl } from './novel-writer.repository.impl';

export const NovelWriterRepositoryToken = 'NovelWriterRepository';

export const NovelWriterRepositoryProvider: Provider = {
  provide: NovelWriterRepositoryToken,
  useClass: NovelWriterRepositoryImpl,
};

export interface NovelWriterRepository {
  saveRow(entity: Partial<NovelWriterEntity>): Promise<void>;
  saveRows(entities: Partial<NovelWriterEntity>[]);
  updateRow(id: number, entity: Partial<NovelWriterEntity>): Promise<void>;
  findByUserEmail(email: string): Promise<NovelWriterEntity[]>;
  deleteRow(id: number): Promise<void>;
  findByoptions(
    options: FindOneOptions<NovelWriterEntity>,
  ): Promise<NovelWriterEntity[]>;
  findByNovelRoomId(novelRoomId: number): Promise<NovelWriterEntity[]>;
  findOneByUserIdAndNovelRoomId(
    userId: number,
    novelRoomId: number,
  ): Promise<NovelWriterEntity>;
  findOneByOptions(
    options: FindOneOptions<NovelWriterEntity>,
  ): Promise<NovelWriterEntity>;
  findBynovelRoomIdAttendingCount(novelRoomId: number): Promise<number>;
}
