import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNovelRoomDto } from 'src/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from 'src/novel-room/dto/update-novel-room.dto';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { userEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { NovelWriterStatusEnum } from '../novel-writer/entities/enums/novel-writer.enum';
import { NovelRoomDuplicationSubTitleException } from './exceptions/duplicate-subtitle.exception';
import { NovelRoomDuplicationTitleException } from './exceptions/duplicate-title.exception';
import { NovelRoomNotFoundeException } from './exceptions/not-found.exception';

@Injectable()
export class NovelRoomService {
  constructor(
    @InjectRepository(NovelRoomEntity)
    private readonly novelRoomRepository: Repository<NovelRoomEntity>,
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
    @Inject(NovelWriterRepository)
    private readonly novelWriterRepository: NovelWriterRepository,
  ) {}

  async getAllRooms(): Promise<NovelRoomEntity[]> {
    return this.novelRoomRepository.find();
  }
  async createRoomTest(createNovelRoomDto: CreateNovelRoomDto): Promise<void> {
    const { title, subTitle } = createNovelRoomDto;
    /**
     *  성능상 이슈 findOne 보다 exist 이 리소스 소비가 덜 사용됨
     */
    const checkTitle = await this.novelRoomRepository.exist({
      where: { title },
    });

    if (checkTitle) {
      throw new NovelRoomDuplicationTitleException();
    }
    const checkSubTitle = await this.novelRoomRepository.exist({
      where: { subTitle },
    });

    if (checkSubTitle) {
      throw new NovelRoomDuplicationSubTitleException();
    }

    const room = this.novelRoomRepository.create(createNovelRoomDto);
    const saveRoom = await this.novelRoomRepository.save(room);
    /**
     *  방 생성후 대표작가로 novelWriter 로 할당
     */
    await this.novelWriterRepository.addRow(
      NovelWriterEntity.of(
        saveRoom.id,
        NovelWriterStatusEnum.REPRESENTATIVE_WRITER,
        room.user,
      ),
    );
  }

  // async createRoom(
  //   createNovelRoomDto: CreateNovelRoomDto,
  // ): Promise<NovelRoomEntity> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: createNovelRoomDto.userId },
  //   });

  //   if (!user) {
  //     throw new NotFoundException('유저 정보를 찾을 수 없습니다.');
  //   }

  //   const room = this.novelRoomRepository.create(createNovelRoomDto);
  //   room.user = user;

  //   return await this.novelRoomRepository.save(room);
  // }

  async getById(id: number): Promise<NovelRoomEntity> {
    const room = await this.novelRoomRepository.findOne({
      where: { id },
    });
    if (!room) {
      throw new NovelRoomNotFoundeException();
    }
    return room;
  }

  async deleteRoom(id: number): Promise<void> {
    await this.novelRoomRepository.delete({
      id: id,
    });
  }

  async updateRoom(
    id: number,
    updateNovelRoomDto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    const room = await this.getById(id);

    if (updateNovelRoomDto.subTitle) {
      room.subTitle = updateNovelRoomDto.subTitle;
    }

    if (updateNovelRoomDto.category) {
      room.category = updateNovelRoomDto.category;
    }

    return await this.novelRoomRepository.save(room);
  }
}
