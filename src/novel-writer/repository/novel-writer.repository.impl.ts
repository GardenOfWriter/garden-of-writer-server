import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { NovelWriterEntity } from '../entities/novel-writer.entity';

import { NovelWriterRepository } from './novel-writer.repository';

export class NovelWriterRepositoryImpl implements NovelWriterRepository {
  constructor(
    @InjectRepository(NovelWriterEntity)
    private dataSource: Repository<NovelWriterEntity>,
  ) {}
  findByNovelRoomId(novelRoomId: number): Promise<NovelWriterEntity[]> {
    return this.dataSource
      .createQueryBuilder('novelWriter')
      .select([
        'novelWriter.id',
        'novelWriter.status',
        'user.id',
        'user.nickname',
      ])
      .leftJoin('novelWriter.user', 'user')
      .where('novelWriter.novelRoom = :novelRoomId', { novelRoomId })
      .getMany();
  }
  async findByoptions(
    options: FindOneOptions<NovelWriterEntity>,
  ): Promise<NovelWriterEntity[]> {
    return await this.dataSource.find(options);
  }

  async addRow(entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.dataSource.save(entity);
    return;
  }
  async updateRow(
    id: number,
    entity: Partial<NovelWriterEntity>,
  ): Promise<void> {
    await this.dataSource.update({ id }, entity);
    return;
  }
  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete({ id });
    return;
  }
}
