import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';
import { NovelAttendBoardRepository } from './novel-attend-board.repository';

export class NovelAttendBoardRepositoryImpl
  implements NovelAttendBoardRepository
{
  constructor(
    @InjectRepository(NovelAttendBoardEntity)
    private dataSource: Repository<NovelAttendBoardEntity>,
  ) {}
  async addRow(entity: NovelAttendBoardEntity): Promise<void> {
    await this.dataSource.save(entity);
  }
  async updateRow(id: number, entity: NovelAttendBoardEntity): Promise<void> {
    await this.dataSource.update({ id }, entity);
  }
  findWithNovelRoom(): Promise<[NovelAttendBoardEntity[], number]> {
    return this.dataSource
      .createQueryBuilder('nad')
      .select([
        'novelRoom.title',
        'novelRoom.createdAt',
        'novelRoom.user',
        'novelRoom.type',
        'nad.title',
        'nad.content',
        'nad.viewCount',
      ])
      .leftJoin('nad.novelRoom', 'novelRoom')
      .leftJoinAndSelect('novelRoom.novelWriter', 'novelWriter')
      .getManyAndCount();
  }
}
