import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelTextEntity } from '../entities/novel-text.entity';
import { NovelTextRepository } from './novel-text.repository';

export class NovelTextRepositoryImpl implements NovelTextRepository {
  constructor(
    @InjectRepository(NovelTextEntity)
    private dataSource: Repository<NovelTextEntity>,
  ) {}
  async addRow(entity: NovelTextEntity): Promise<void> {
    await this.dataSource.save(entity);
  }
  async updateRow(id: number, entity: Partial<NovelTextEntity>): Promise<void> {
    await this.dataSource.update({ id }, entity);
  }
  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete({ id });
  }
  async findByChapterId(chapterId: number): Promise<NovelTextEntity> {
    return await this.dataSource.findOne({ where: { chapterId } });
  }
}
