import { Controller, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NovelAttendBoardEntity } from './entities/novel-attend-board.entity';
import {
  NovelAttendBoardRepository,
  NovelAttendBoardRepositryToken,
} from './repository/novel-attend-board.repository';
import { NovelRoomEntity } from '../novel-room/entities/novel-room.entity';
import { Repository } from 'typeorm';
import { NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';
import { userEntity } from '../user/entities/user.entity';
import { FindAllNovelAttendBoardDto } from './dto/response/findall.dto';

@Injectable()
export class NovelAttendBoardService {
  constructor(
    @Inject(NovelAttendBoardRepositryToken)
    private novelAttendBoardRepository: NovelAttendBoardRepository,
    @InjectRepository(NovelRoomEntity)
    private novelRoomRepository: Repository<NovelRoomEntity>,
    // private novelWriterRepository: NovelWriterRepository,
  ) {}

  async create(entity: Partial<NovelAttendBoardEntity>) {
    await this.novelAttendBoardRepository.addRow(entity);
    return;
  }

  async findAll(user: userEntity) {
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
