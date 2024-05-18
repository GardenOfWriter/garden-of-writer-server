import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { NovelWriterEntity } from '../entities/novel-writer.entity';

import { WriterStatusEnum } from '../entities/enums/writer-status.enum';
import { NovelWriterRepository } from './novel-writer.repository';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';

export class NovelWriterRepositoryImpl implements NovelWriterRepository {
  constructor(
    @InjectRepository(NovelWriterEntity)
    private dataSource: Repository<NovelWriterEntity>,
  ) {}

  async countByNovelRoomId(novelRoomId: number): Promise<number> {
    return await this.dataSource.count({
      where: {
        novelRoomId,
      },
    });
  }
  async findByNovelRoomIdAndWriterSeq(novelRoomId: number, writingSeq: number): Promise<NovelWriterEntity> {
    return await this.dataSource.findOne({
      where: {
        novelRoomId,
        writingSeq,
      },
    });
  }

  async findByUserId(userId: number): Promise<NovelWriterEntity> {
    return await this.dataSource.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  findByUserEmail(email: string): Promise<NovelWriterEntity[]> {
    return this.dataSource.find({
      where: {
        user: {
          email,
        },
      },
    });
  }

  findBynovelRoomIdAttendingCount(novelRoomId: number): Promise<number> {
    return this.dataSource.count({
      where: {
        novelRoomId,
        status: WriterStatusEnum.ATTENDING,
      },
    });
  }

  findOneByOptions(options: FindOneOptions<NovelWriterEntity>): Promise<NovelWriterEntity> {
    return this.dataSource.findOne(options);
  }

  async findOneByUserIdAndNovelRoomId(userId: number, novelRoomId: number): Promise<NovelWriterEntity> {
    return await this.dataSource.findOne({
      where: {
        user: {
          id: userId,
        },
        novelRoom: {
          id: novelRoomId,
        },
      },
    });
  }

  async findByNovelRoomId(novelRoomId: number): Promise<NovelWriterEntity[]> {
    return await this.dataSource.find({
      select: ['id', 'status', 'category', 'writingSeq', 'currentlyWriting', 'user'],
      relations: ['user'],
      where: {
        status: WriterStatusEnum.ATTENDING,
        novelRoom: {
          id: novelRoomId,
        },
      },
      order: {
        writingSeq: 'ASC',
      },
    });
  }

  async findByoptions(options: FindOneOptions<NovelWriterEntity>): Promise<NovelWriterEntity[]> {
    return await this.dataSource.find(options);
  }

  async findByNovelRoomIdDetails(novelRoomId: number, pagination: BasePaginationRequest): Promise<[NovelWriterEntity[], number]> {
    return await this.dataSource.findAndCount({
      relations: ['user'],
      where: {
        novelRoom: { id: novelRoomId },
      },
      take: pagination.take,
      skip: pagination.skip,
    });
  }

  async saveRow(entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.dataSource.save(entity);
    return;
  }

  async saveRows(entities: Partial<NovelWriterEntity[]>): Promise<void> {
    await this.dataSource.save(entities);
    return;
  }
  async updateRow(id: number, entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.dataSource.update({ id }, entity);
    return;
  }
  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete({ id });
    return;
  }
}
