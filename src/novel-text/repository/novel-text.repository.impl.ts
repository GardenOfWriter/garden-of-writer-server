import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { NovelTextEntity } from '../entities/novel-text.entity';
import { NovelTextRepository } from './novel-text.repository';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';

import { NovelTextStatusEnum } from '../entities/enum/novel-text-status.enum';
import _, { sortBy } from 'lodash';

export class NovelTextRepositoryImpl implements NovelTextRepository {
  constructor(
    @InjectRepository(NovelTextEntity)
    private dataSource: Repository<NovelTextEntity>,
  ) {}
  async findByChapterId(chapterId: number, pagination: BasePaginationRequest): Promise<[NovelTextEntity[], number]> {
    return await this.dataSource.findAndCount({ take: pagination.take, skip: pagination.skip, where: { chapterId }, order: { createdAt: 'ASC' } });
  }
  async addRow(entity: Partial<NovelTextEntity>): Promise<number> {
    const result = await this.dataSource.save(entity);
    return result.id;
  }
  async updateRow(id: number, entity: Partial<NovelTextEntity>): Promise<void> {
    await this.dataSource.update({ id }, entity);
  }
  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete({ id });
  }
  async findById(id: number): Promise<NovelTextEntity> {
    return await this.dataSource.findOne({ where: { id } });
  }
  async findByIdJoinUser(id: number): Promise<NovelTextEntity> {
    return await this.dataSource.findOne({ where: { id }, relations: ['createdBy'] });
  }
  async findByChapterIdJoinUser(chapterId: number, pagination: BasePaginationRequest): Promise<[NovelTextEntity[], number]> {
    const [datas, count] = await this.dataSource.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      where: { chapterId },
      order: { createdAt: 'DESC' },
      relations: ['createdBy'],
    });
    const sortData = sortBy(datas, 'id');
    return [sortData, count];
  }
  async findByChpaterIdNotCompleted(chapterId: number): Promise<NovelTextEntity[]> {
    return await this.dataSource.find({ where: { chapterId, status: NovelTextStatusEnum.TEMP_SAVE } });
  }
}
