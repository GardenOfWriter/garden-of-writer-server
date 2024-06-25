import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ChapterEntity } from '../entities/chapter.entity';
import { ChapterRepository } from './chapter.repository';

export class ChapterRepositoryImpl implements ChapterRepository {
  constructor(
    @InjectRepository(ChapterEntity)
    private dataSource: Repository<ChapterEntity>,
  ) {}

  async findById(id: number): Promise<ChapterEntity> {
    return await this.dataSource.findOne({ where: { id } });
  }
  async saveRow(entity: Partial<ChapterEntity>): Promise<void> {
    await this.dataSource.save(entity);
  }
  async findOneByOptions(options: FindOneOptions<ChapterEntity>): Promise<ChapterEntity> {
    return await this.dataSource.findOne(options);
  }

  async findOneLatestByIdJoinNovelRoom(id: number): Promise<ChapterEntity> {
    return await this.dataSource.findOne({
      relations: ['novelRoom'],
      where: {
        id,
      },
      order: {
        no: 'DESC',
      },
    });
  }
  async countByNovelRoomId(noveRoomId: number): Promise<number> {
    return await this.dataSource.count({
      where: {
        novelRoom: { id: noveRoomId },
      },
    });
  }
  async findChpaterByRoomIdAndCount(novelRoomId: number, pagination: BasePaginationRequest): Promise<[ChapterEntity[], number]> {
    return await this.dataSource.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      where: {
        novelRoom: { id: novelRoomId },
      },
      order: {
        no: 'DESC',
      },
    });
  }
  async findByoptions(options: FindOneOptions<ChapterEntity>): Promise<ChapterEntity[]> {
    return await this.dataSource.find(options);
  }

  async save(entity: Partial<ChapterEntity>): Promise<void> {
    await this.dataSource.save(entity);
    return;
  }
  async updateRow(id: number, entity: Partial<ChapterEntity>): Promise<void> {
    await this.dataSource.update({ id }, entity);
    return;
  }
  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete({ id });
    return;
  }
}
