import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterStatusEnum } from '@app/chapter/entities/enums/chapter-status.enum';
import { ChapterRepositoryToken } from '@app/chapter/repository/chapter.repository';
import { WriterCategoryEnum } from '@app/novel-writer/entities/enums/writer-category.enum';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import {
  NovelWriterRepository,
  NovelWriterRepositoryToken,
} from '@app/novel-writer/repository/novel-writer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNovelRoomDto } from 'src/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from 'src/novel-room/dto/update-novel-room.dto';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';

import { In, Repository } from 'typeorm';
import { ChapterRepository } from '../chapter/repository/chapter.repository';

import { FindAttendQueryDto } from './dto/request/find-attend-query.dto';
import { FindAttendStatusNovelRoomDto } from './dto/response/find-attend-status.dto';
import { NovelRoomDuplicationSubTitleException } from './exceptions/duplicate-subtitle.exception';
import { NovelRoomDuplicationTitleException } from './exceptions/duplicate-title.exception';
import { NovelRoomNotFoundException } from './exceptions/not-found.exception';
import { UserEntity } from '@app/user/entities/user.entity';
import { FindByRoomIdDetailDto } from './dto/response/findbyid-detail.dto';
import { WriterStatusEnum } from '@app/novel-writer/entities/enums/writer-status.enum';

@Injectable()
export class NovelRoomService {
  constructor(
    /**
     * TODO : repository layer로 분리하는걸 확인
     */
    @InjectRepository(NovelRoomEntity)
    private readonly novelRoomRepository: Repository<NovelRoomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(NovelWriterRepositoryToken)
    private readonly novelWriterRepository: NovelWriterRepository,
    @Inject(ChapterRepositoryToken)
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async findAllRooms(user: UserEntity, dto: FindAttendQueryDto): Promise<any> {
    /**
     *  참여중 미참여중 필터링
     */
    const roomFilter = dto.queryConvertStatus();
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
  async createRoom(createNovelRoomDto: CreateNovelRoomDto): Promise<void> {
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
    // 삭제 필요
    // const room = this.novelRoomRepository.create(createNovelRoomDto.toEntity());
    const saveRoom = await this.novelRoomRepository.save(
      createNovelRoomDto.toEntity(),
    );

    /**
     *  소설 공방 생성후 트리거 발생
     *  1. novelWriter테이블 대표 작가 할당
     *  2. 프롤로그 회차 자동 생성
     */
    await Promise.allSettled(
      this.saveRoomTrigger(saveRoom, createNovelRoomDto),
    );
  }

  async getById(id: number): Promise<FindByRoomIdDetailDto> {
    const room = await this.novelRoomRepository.findOne({
      where: { id },
    });
    if (!room) {
      throw new NovelRoomNotFoundException();
    }
    return new FindByRoomIdDetailDto(room);
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
    const room = await this.novelRoomRepository.findOne({
      where: {
        id,
      },
    });

    if (updateNovelRoomDto.subTitle) {
      room.subTitle = updateNovelRoomDto.subTitle;
    }

    if (updateNovelRoomDto.category) {
      room.category = updateNovelRoomDto.category;
    }

    return await this.novelRoomRepository.save(room);
  }
  private saveRoomTrigger(
    room: NovelRoomEntity,
    dto: CreateNovelRoomDto,
  ): any[] {
    const writer = NovelWriterEntity.of(
      room.id,
      WriterCategoryEnum.HOST,
      WriterStatusEnum.ATTENDING,
      dto.getUser(),
    );
    writer.changeStatue(WriterStatusEnum.ATTENDING);
    return [
      this.novelWriterRepository.saveRow(
        NovelWriterEntity.of(
          room.id,
          WriterCategoryEnum.HOST,
          WriterStatusEnum.ATTENDING,
          dto.getUser(),
        ),
      ),
      this.chapterRepository.saveRow(
        ChapterEntity.of(
          room.id,
          ChapterStatusEnum.WRITING,
          '프롤로그',
          dto.getUser(),
        ),
      ),
    ];
  }
}
