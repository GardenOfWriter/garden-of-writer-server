import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { NovelTextEntity } from '../entities/novel-text.entity';
import { NovelTextRepository } from './novel-text.repository';

export class NovelTextRepositoryImpl implements NovelTextRepository {
  constructor(
    @InjectRepository(NovelTextEntity)
    private dataSource: Repository<NovelTextEntity>,
  ) {}
  async findByChapterId(options: FindOneOptions<NovelTextEntity>): Promise<NovelTextEntity[]> {
    return await this.dataSource.find(options);
  }
  async addRow(entity: Partial<NovelTextEntity>): Promise<number> {
    const result = await this.dataSource.save(entity);
    console.log(result);
    return result.id;
  }
  async updateRow(id: number, entity: Partial<NovelTextEntity>): Promise<void> {
    await this.dataSource.update(id, entity);
  }
  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete({ id });
  }
}
