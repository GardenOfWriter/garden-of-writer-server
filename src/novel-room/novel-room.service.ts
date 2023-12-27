import { NovelWriterCategoryEnum } from '@app/novel-writer/entities/enums/novel-writer-category.enum';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dot } from 'node:test/reporters';
import { CreateNovelRoomDto } from 'src/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from 'src/novel-room/dto/update-novel-room.dto';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { userEntity } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import {
  NovelWriterStatusEnum,
  NovelWriterStatusType,
} from '../novel-writer/entities/enums/novel-writer-status.enum';
import {
  FindAttendQueryDto,
  NovelRoomAttendQueryEnum,
} from './dto/request/find-attend-query.dto';
import { FindAttendStatusNovelRoomDto } from './dto/response/find-attend-status.dto';
import { NovelRoomDuplicationSubTitleException } from './exceptions/duplicate-subtitle.exception';
import { NovelRoomDuplicationTitleException } from './exceptions/duplicate-title.exception';
import { NovelRoomNotFoundeException } from './exceptions/not-found.exception';

@Injectable()
export class NovelRoomService {
  constructor(
    /**
     * TODO : repository layer로 분리하는걸 확인
     */
    @InjectRepository(NovelRoomEntity)
    private readonly novelRoomRepository: Repository<NovelRoomEntity>,
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
    @Inject(NovelWriterRepository)
    private readonly novelWriterRepository: NovelWriterRepository,
  ) {}

  async getAllRooms(user: userEntity, dto: FindAttendQueryDto): Promise<any> {
    /**
     *  참여중 미참여중 필터링
     */
    const roomFilter = this.filterQueryRoomStatus(dto);
    const rooms = await this.novelRoomRepository.find({
      relations: ['novelWriter', 'novelWriter.user'],
      where: {
        novelWriter: {
          user: { id: user.id },
          status: In(roomFilter),
        },
      },
    });

    if (!rooms || rooms.length === 0) {
      return [];
    }
    return rooms.map(
      (room: NovelRoomEntity) => new FindAttendStatusNovelRoomDto(user, room),
    );
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

    // const room = this.novelRoomRepository.create(createNovelRoomDto.toEntity());
    const saveRoom = await this.novelRoomRepository.save(
      createNovelRoomDto.toEntity(),
    );

    /**
     *  소설 공방 생성후 대표작가로 novelWriter 로 할당
     */
    await this.novelWriterRepository.saveRow(
      NovelWriterEntity.of(
        saveRoom.id,
        NovelWriterCategoryEnum.REPRESENTATIVE_WRITER,
        NovelWriterStatusEnum.ATTENDING,
        createNovelRoomDto.getUser(),
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
  private filterQueryRoomStatus(
    dto: FindAttendQueryDto,
  ): NovelWriterStatusType[] {
    return dto.roomStatus === NovelRoomAttendQueryEnum.NOT_PARTICIPATING
      ? ['attending_reject', 'attending_review', 'exit']
      : ['attending'];
  }
}
