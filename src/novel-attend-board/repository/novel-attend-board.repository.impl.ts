import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';
import { NovelAttendBoardRepository } from './novel-attend-board.repository';
import { BoardLikeEntity } from '../entities/board-like.entity';

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
  async findWithNovelRoom(): Promise<[NovelAttendBoardEntity[], number]> {
    return await this.dataSource
      .createQueryBuilder('nad')
      .select(['novelRoom.title', 'novelRoom.createdAt', 'novelRoom.user', 'novelRoom.type', 'nad.title', 'nad.content', 'nad.viewCount'])
      .leftJoin('nad.novelRoom', 'novelRoom')
      .leftJoinAndSelect('novelRoom.novelWriter', 'novelWriter')
      .getManyAndCount();
  }

  async findByIdWhereLikeUser(roomId: number): Promise<NovelAttendBoardEntity> {
    return await this.dataSource.findOne({
      relations: ['boardLike'],
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
}
