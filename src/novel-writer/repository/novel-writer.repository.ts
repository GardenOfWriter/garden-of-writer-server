import { FindOneOptions } from 'typeorm';
import { NovelWriterEntity } from '../entities/novel-writer.entity';
import { NovelRoomEntity } from '../../novel-room/entities/novel-room.entity';

export const NovelWriterRepositoryToken = 'NovelWriterRepository';

export interface NovelWriterRepository {
  saveRow(entity: Partial<NovelWriterEntity>): Promise<void>;
  saveRows(entities: Partial<NovelWriterEntity>[]);
  updateRow(id: number, entity: Partial<NovelWriterEntity>): Promise<void>;
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
