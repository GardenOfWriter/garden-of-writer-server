import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { NovelWriterEntity } from '../entities/novel-writer.entity';

import { NovelWriterRepository } from './novel-writer.repository';
import { NovelWriterStatusEnum } from '../entities/enums/novel-writer-status.enum';
import { NovelRoomStatusEnum } from '../../novel-room/entities/enum/novel-room-status.enum';

export class NovelWriterRepositoryImpl implements NovelWriterRepository {
  constructor(
    @InjectRepository(NovelWriterEntity)
    private dataSource: Repository<NovelWriterEntity>,
  ) {}
  findBynovelRoomIdAttendingCount(novelRoomId: number): Promise<number> {
    return this.dataSource.count({
      where: {
        novelRoomId,
        status: NovelWriterStatusEnum.ATTENDING,
      },
    });
  }

  findOneByOptions(
    options: FindOneOptions<NovelWriterEntity>,
  ): Promise<NovelWriterEntity> {
    return this.dataSource.findOne(options);
  }

  async findOneByUserIdAndNovelRoomId(
    userId: number,
    novelRoomId: number,
  ): Promise<NovelWriterEntity> {
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

  findByNovelRoomId(novelRoomId: number): Promise<NovelWriterEntity[]> {
    return this.dataSource.find({
      select: [
        'id',
        'status',
        'category',
        'writingSeq',
        'currentlyWriting',
        'user',
      ],
      relations: ['user'],
      where: {
        status: NovelWriterStatusEnum.ATTENDING,
        novelRoom: {
          id: novelRoomId,
        },
      },
      order: {
        writingSeq: 'ASC',
      },
    });
  }
  async findByoptions(
    options: FindOneOptions<NovelWriterEntity>,
  ): Promise<NovelWriterEntity[]> {
    return await this.dataSource.find(options);
  }

  async saveRow(entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.dataSource.save(entity);
    return;
  }

  async saveRows(entities: Partial<NovelWriterEntity[]>): Promise<void> {
    await this.dataSource.save(entities);
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
