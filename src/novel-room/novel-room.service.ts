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
import { CreateNovelRoomDto } from '@app/novel-room/dto/request/create-novel-room.dto';
import { UpdateNovelRoomDto } from '@app/novel-room/dto/request/update-novel-room.dto';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { ChapterRepository } from '../chapter/repository/chapter.repository';
import { FindAttendQueryDto } from './dto/request/find-attend-query.dto';
import { FindAttendStatusNovelRoomDto } from './dto/response/find-attend-status.dto';
import { NovelRoomDuplicationTitleException } from './exceptions/duplicate-title.exception';
import { NovelRoomNotFoundException } from './exceptions/not-found.exception';
import { UserEntity } from '@app/user/entities/user.entity';
import { FindByRoomIdDetailDto } from './dto/response/findbyid-detail.dto';
import { WriterStatusEnum } from '@app/novel-writer/entities/enums/writer-status.enum';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import {
  NovelRoomRepository,
  NovelRoomRepositoryToken,
} from './repository/novel-room.repository';

@Injectable()
export class NovelRoomService {
  constructor(
    @Inject(NovelRoomRepositoryToken)
    private readonly novelRoomRepository: NovelRoomRepository,
    @Inject(NovelWriterRepositoryToken)
    private readonly novelWriterRepository: NovelWriterRepository,
    @Inject(ChapterRepositoryToken)
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async findAllRooms(
    user: UserEntity,
    dto: FindAttendQueryDto,
  ): Promise<PagingationResponse<FindAttendStatusNovelRoomDto>> {
    const roomFilter = dto.queryConvertStatus();
    const [rooms, totalCount] =
      await this.novelRoomRepository.findAllJoinWriterByStatus(
        user,
        roomFilter,
        dto,
      );
    const items = rooms.map(
      (room: NovelRoomEntity) => new FindAttendStatusNovelRoomDto(user, room),
    );
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }
  async createRoom(dto: CreateNovelRoomDto): Promise<NovelRoomEntity> {
    const checkTitle = await this.novelRoomRepository.existTitle(dto.title);
    if (checkTitle) throw new NovelRoomDuplicationTitleException();
    const roomEntity = dto.toRoomEntity();
    await this.novelRoomRepository.saveRow(roomEntity);
    await Promise.allSettled(this.saveRoomTrigger(roomEntity, dto));
    return roomEntity;
  }

  async getById(id: number): Promise<FindByRoomIdDetailDto> {
    const room = await this.novelRoomRepository.getById(id);
    if (!room) throw new NovelRoomNotFoundException();
    return new FindByRoomIdDetailDto(room);
  }

  async deleteRoom(id: number): Promise<void> {
    await this.novelRoomRepository.deleteRow(id);
  }

  async updateRoom(
    id: number,
    dto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    const room = await this.novelRoomRepository.getById(id);
    if (!room) throw new NovelRoomNotFoundException();
    room.updateSubTitleAndCategory(dto.subTitle, dto.category);
    await this.novelRoomRepository.saveRow(room);
    return room;
  }
  private saveRoomTrigger(
    room: NovelRoomEntity,
    dto: CreateNovelRoomDto,
  ): any[] {
    const user = dto.getUser();
    const writerStatus = WriterStatusEnum.ATTENDING;
    const host = WriterCategoryEnum.HOST;
    const chpaterStatus = ChapterStatusEnum.WRITING;
    const writer = NovelWriterEntity.of(room.id, host, writerStatus, user);
    const chapter = ChapterEntity.of(room.id, chpaterStatus, user);
    return [
      this.novelWriterRepository.saveRow(writer),
      this.chapterRepository.saveRow(chapter),
    ];
  }
}
