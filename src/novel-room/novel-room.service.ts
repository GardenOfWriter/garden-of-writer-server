import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNovelRoomDto } from 'src/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from 'src/novel-room/dto/update-novel-room.dto';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { userEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NovelRoomService {
  constructor(
    @InjectRepository(NovelRoomEntity)
    private readonly novelRoomRepository: Repository<NovelRoomEntity>,
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
  ) {}

  async getAllRooms(): Promise<NovelRoomEntity[]> {
    return this.novelRoomRepository.find();
  }

  async createRoomTest(
    createNovelRoomDto: CreateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    const { title, subTitle } = createNovelRoomDto;

    const checkTitle = await this.novelRoomRepository.findOne({
      where: { title },
    });

    const checkSubTitle = await this.novelRoomRepository.findOne({
      where: { subTitle },
    });

    if (checkTitle) {
      throw new ConflictException('중복된 소설공방 이름이 존재합니다.');
    }

    if (checkSubTitle) {
      throw new ConflictException('중복된 한줄소개가 존재합니다.');
    }

    const room = this.novelRoomRepository.create(createNovelRoomDto);
    return await this.novelRoomRepository.save(room);
  }

  async createRoom(
    createNovelRoomDto: CreateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    const user = await this.userRepository.findOne({
      where: { id: createNovelRoomDto.userId },
    });

    if (!user) {
      throw new NotFoundException('유저 정보를 찾을 수 없습니다.');
    }

    const room = this.novelRoomRepository.create(createNovelRoomDto);
    room.user = user;

    return await this.novelRoomRepository.save(room);
  }

  async getById(id: number): Promise<NovelRoomEntity> {
    const room = await this.novelRoomRepository.findOne({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException('해당 공방을 찾을 수 없습니다.');
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
