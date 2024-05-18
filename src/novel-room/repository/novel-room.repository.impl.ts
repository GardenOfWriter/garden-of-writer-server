import { InjectRepository } from '@nestjs/typeorm';
import { NovelRoomEntity } from '../entities/novel-room.entity';
import { In, Repository } from 'typeorm';
import { NovelRoomRepository } from './novel-room.repository';
import { UserEntity } from '@app/user/entities/user.entity';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';

export class NovelRoomRepositoryImpl implements NovelRoomRepository {
  constructor(
    @InjectRepository(NovelRoomEntity)
    private dataSource: Repository<NovelRoomEntity>,
  ) {}
  findAllWithUserAndCount(
    user: UserEntity,
    pagination: BasePaginationRequest,
  ): Promise<[NovelRoomEntity[], number]> {
    return this.dataSource.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      relations: ['user', 'novelRoom'],
    });
  }

  async findAllJoinBoardWithBoardLikeAndCount(
    user: UserEntity,
    pagination: BasePaginationRequest,
  ): Promise<[NovelRoomEntity[], number]> {
    return await this.dataSource.findAndCount({
      relations: [
        'novelWriter',
        'novelWriter.user',
        'novelAttendBoard',
        'novelAttendBoard.boardLike',
      ],
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllJoinWriterByStatus(
    user: UserEntity,
    writerStatus: WriterStatusType[],
    pagination: BasePaginationRequest,
  ): Promise<[NovelRoomEntity[], number]> {
    return await this.dataSource.findAndCount({
      relations: ['novelWriter', 'novelWriter.user'],
      where: {
        novelWriter: {
          status: In(writerStatus),
        },
      },
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getById(id: number): Promise<NovelRoomEntity> {
    return await this.dataSource.findOne({ where: { id } });
  }

  async getByIdWithTag(id: number): Promise<NovelRoomEntity> {
    return await this.dataSource.findOne({
      relations: [
        'novelWriter',
        'novelWriter.user',
        'novelTag',
        'novelTag.tag',
      ],
      where: {
        id,
      },
    });
  }
  async saveRow(entity: NovelRoomEntity): Promise<void> {
    await this.dataSource.save(entity);
    return;
  }

  async existTitle(title: string): Promise<boolean> {
    return await this.dataSource.exist({ where: { title } });
  }

  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete(id);
  }
}
