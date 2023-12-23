import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ChapterEntity } from '../entities/chapter.entity';
import { ChapterRepository } from './chapter.repository';

export class ChapterRepositoryImpl implements ChapterRepository {
  constructor(
    @InjectRepository(ChapterEntity)
    private dataSource: Repository<ChapterEntity>,
  ) {}
  async findByoptions(
    options: FindOneOptions<ChapterEntity>,
  ): Promise<ChapterEntity[]> {
    return await this.dataSource.find(options);
  }

  async addRow(entity: Partial<ChapterEntity>): Promise<void> {
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
