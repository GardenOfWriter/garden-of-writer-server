import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';
import { NovelAttendBoardRepository } from './novel-attend-board.repository';
import { BoardLikeEntity } from '../entities/board-like.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { FindAttendBoardDto } from '../dto/request/find-attend-board.dto';
import { BasePaginationRequest as Pagination } from '@app/commons/pagination/base-paginiation.request';
export class NovelAttendBoardRepositoryImpl implements NovelAttendBoardRepository {
  constructor(
    @InjectRepository(NovelAttendBoardEntity)
    private dataSource: Repository<NovelAttendBoardEntity>,
    @InjectRepository(BoardLikeEntity)
    private boardLikeDataSource: Repository<BoardLikeEntity>,
  ) {}
  async addRow(entity: NovelAttendBoardEntity): Promise<void> {
    await this.dataSource.save(entity);
  }
  async updateRow(id: number, entity: NovelAttendBoardEntity): Promise<void> {
    await this.dataSource.update({ id }, entity);
  }

  async updateViewCounting(id: number): Promise<void> {
    await this.dataSource.update(
      { id },
      {
        viewCount: () => 'view_count + 1',
      },
    );
  }
  async findWithNovelRoom(): Promise<[NovelAttendBoardEntity[], number]> {
    return await this.dataSource
      .createQueryBuilder('nad')
      .select(['novelRoom.title', 'novelRoom.createdAt', 'novelRoom.user', 'novelRoom.type', 'nad.title', 'nad.content', 'nad.viewCount'])
      .leftJoin('nad.novelRoom', 'novelRoom')
      .leftJoinAndSelect('novelRoom.novelWriter', 'novelWriter')
      .getManyAndCount();
  }

  async findByIdWhereLikeUserJoinNovelRoom(roomId: number): Promise<NovelAttendBoardEntity> {
    return await this.dataSource.findOne({
      relations: ['boardLike', 'novelRoom'],
      where: {
        id: roomId,
      },
    });
  }

  async hasBoardLike(userId: number, roomId: number): Promise<boolean> {
    return await this.dataSource.exist({
      where: {
        id: roomId,
        boardLike: {
          user: {
            id: userId,
          },
        },
      },
    });
  }

  async createBoardLike(entity: BoardLikeEntity): Promise<void> {
    await this.boardLikeDataSource.save(entity);
    return;
  }
  async getByIdBoardLike(roomid: number): Promise<number> {
    return await this.boardLikeDataSource.count({
      where: {
        attendBoard: {
          id: roomid,
        },
      },
    });
  }
  async deleteRow(id: number): Promise<void> {
    await this.dataSource.delete({ id });
  }
  async findById(id: number): Promise<NovelAttendBoardEntity> {
    return await this.dataSource.findOne({ where: { id } });
  }

  async findAllJoinRoomWIthBoardLikeAndCount(user: UserEntity, pagination: Pagination): Promise<[NovelAttendBoardEntity[], number]> {
    return await this.dataSource.findAndCount({
      relations: ['novelRoom', 'boardLike', 'novelRoom.novelWriter'],
      take: pagination.take,
      skip: pagination.skip,
      order: {
        id: 'DESC',
      },
    });
  }
}
