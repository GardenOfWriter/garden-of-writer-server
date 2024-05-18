import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { FindOneOptions } from 'typeorm';
import { ChapterEntity } from '../entities/chapter.entity';
import { Inject, Provider } from '@nestjs/common';
import { ChapterRepositoryImpl } from './chapter.repository.impl';

export const ChapterRepositoryToken = 'ChapterRepository';

export const ChapterRepo = () => Inject(ChapterRepositoryToken);

export const ChapterRepositoryProvider: Provider = {
  provide: ChapterRepositoryToken,
  useClass: ChapterRepositoryImpl,
};
export interface ChapterRepository {
  saveRow(entity: Partial<ChapterEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<ChapterEntity>): Promise<void>;
  deleteRow(id: number): Promise<void>;
  findByoptions(options: FindOneOptions<ChapterEntity>): Promise<ChapterEntity[]>;
  findChpaterByRoomIdAndCount(novelRoomId: number, pagination: BasePaginationRequest): Promise<[ChapterEntity[], number]>;
  findOneByOptions(options: FindOneOptions<ChapterEntity>): Promise<ChapterEntity>;
  chapterCount(noveRoomId: number): Promise<number>;
}
