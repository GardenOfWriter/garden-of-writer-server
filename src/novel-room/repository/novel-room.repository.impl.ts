import { InjectRepository } from '@nestjs/typeorm';
import { NovelRoomEntity } from '../entities/novel-room.entity';
import { In, Repository } from 'typeorm';
import { NovelRoomRepository } from './novel-room.repository';
import { UserEntity } from '@app/user/entities/user.entity';
import { BasePaginationRequest as Pagination } from '@app/commons/pagination/base-paginiation.request';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { NovelRoomStatusReqEnum } from '@app/novel-view/dto/request/find-all-novel-request.dto';
import { NovelRoomCategoryType } from '../entities/enum/novel-room-category.enum';
import { NovelRoomStatusEnum, NovelRoomStatusType } from '../entities/enum/novel-room-status.enum';

export class NovelRoomRepositoryImpl implements NovelRoomRepository {
  constructor(
    @InjectRepository(NovelRoomEntity)
    private dataSource: Repository<NovelRoomEntity>,
  ) {}
  async findAllWithUserAndCount(user: UserEntity, pagination: Pagination): Promise<[NovelRoomEntity[], number]> {
    return await this.dataSource.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      relations: ['user', 'novelRoom'],
    });
  }

  async findAllJoinBoardWithBoardLikeAndCount(user: UserEntity, pagination: Pagination): Promise<[NovelRoomEntity[], number]> {
    return await this.dataSource.findAndCount({
      relations: ['novelWriter', 'novelWriter.user', 'novelAttendBoard', 'novelAttendBoard.boardLike'],
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllJoinWriterByStatus(user: UserEntity, writerStatus: WriterStatusType[], pagination: Pagination): Promise<[NovelRoomEntity[], number]> {
    const result = await this.dataSource.findAndCount({
      relations: ['novelWriter', 'user'],
      where: {
        novelWriter: {
          user: {
            id: user.id,
          },
          status: In(writerStatus),
        },
      },
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: 'DESC',
      },
    });
    return result;
  }

  async getById(id: number): Promise<NovelRoomEntity> {
    return await this.dataSource.findOne({ where: { id } });
  }

  async getByIdWithTag(id: number): Promise<NovelRoomEntity> {
    return await this.dataSource.findOne({
      relations: ['novelWriter', 'novelWriter.user', 'novelTag', 'novelTag.tag'],
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
  async findAllByStatusAndCategoryJoinWriter({
    category,
    status,
    paging,
  }: {
    category: NovelRoomCategoryType;
    status: NovelRoomStatusReqEnum;
    paging: Pagination;
  }): Promise<[NovelRoomEntity[], number]> {
    let noveRoomStatus: NovelRoomStatusType[] | null = [];
    if (status === NovelRoomStatusReqEnum.SERIES) {
      noveRoomStatus = [NovelRoomStatusEnum.SERIES];
    } else if (status === NovelRoomStatusReqEnum.COMPLETE) {
      noveRoomStatus = [NovelRoomStatusEnum.COMPLETE];
    } else if (status === NovelRoomStatusReqEnum.ALL) {
      noveRoomStatus = [NovelRoomStatusEnum.SERIES, NovelRoomStatusEnum.COMPLETE];
    }

    return await this.dataSource.findAndCount({
      relations: ['novelWriter', 'user'],
      where: {
        category,
        status: In(noveRoomStatus),
      },
      take: paging.take,
      skip: paging.skip,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
