import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelRoomEntity } from '../novel-room/entities/novel-room.entity';
import { UserEntity } from '../user/entities/user.entity';
import { FindAllNovelAttendBoardDto } from './dto/response/findall.dto';
import { NovelAttendBoardEntity } from './entities/novel-attend-board.entity';
import {
  NovelAttendBoardRepository,
  NovelAttendBoardRepositryToken,
} from './repository/novel-attend-board.repository';

@Injectable()
export class NovelAttendBoardService {
  constructor(
    @Inject(NovelAttendBoardRepositryToken)
    private novelAttendBoardRepository: NovelAttendBoardRepository,
    @InjectRepository(NovelRoomEntity)
    private novelRoomRepository: Repository<NovelRoomEntity>,
  ) {}

  async create(entity: Partial<NovelAttendBoardEntity>) {
    await this.novelAttendBoardRepository.addRow(entity);
    return;
  }

  async findAll(user: UserEntity) {
    const rooms = await this.novelRoomRepository
      .createQueryBuilder('nr')
      .select(['nr', 'nw', 'nad', 'user'])
      .leftJoin('nr.novelWriter', 'nw')
      .leftJoin('nr.novelAttendBoard', 'nad')
      .leftJoin('nw.user', 'user')
      .getMany();
    return rooms.map((room) => new FindAllNovelAttendBoardDto(user, room));
  }
}
