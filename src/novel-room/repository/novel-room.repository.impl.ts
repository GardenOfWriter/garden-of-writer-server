import { InjectRepository } from '@nestjs/typeorm';
import { NovelRoomEntity } from '../entities/novel-room.entity';
import { Repository } from 'typeorm';
import { NovelRoomRepository } from './novel-room.repository';
import { UserEntity } from '@app/user/entities/user.entity';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';

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
}
