import { ChapterRepositoryToken } from '@app/chapter/repository/chapter.repository';
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
  /**
   * 소설 공방 목록 조회
   */
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
  /**
   * 소설 공방 생성
   */
  async createRoom(
    dto: CreateNovelRoomDto,
    user: UserEntity,
  ): Promise<NovelRoomEntity> {
    const checkTitle = await this.novelRoomRepository.existTitle(dto.title);
    if (checkTitle) throw new NovelRoomDuplicationTitleException();
    const room = dto.toRoomEntity(user);
    await this.novelRoomRepository.saveRow(room);
    const writer = dto.toWriterEntity(room.id, user);
    const chapter = dto.toChapterEntity(room.id, user);
    await Promise.all([
      await this.novelWriterRepository.saveRow(writer),
      await this.chapterRepository.saveRow(chapter),
    ]);
    return room;
  }
  /**
   * 소설 공방 상세 조회
   */
  async getById(id: number, user: UserEntity): Promise<FindByRoomIdDetailDto> {
    const room = await this.novelRoomRepository.getByIdWithTag(id);
    if (!room) throw new NovelRoomNotFoundException();
    return new FindByRoomIdDetailDto(room, user);
  }
  /**
   * 소설 공방 삭제
   */
  async deleteRoom(id: number): Promise<void> {
    await this.novelRoomRepository.deleteRow(id);
  }
  /**
   * 소설 공방 정보 수정
   */
  async updateRoom(
    id: number,
    dto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    const room = await this.novelRoomRepository.getById(id);
    if (!room) throw new NovelRoomNotFoundException();
    room.updateRoom(
      dto.subTitle,
      dto.category,
      dto.character,
      dto.summary,
      dto.bookCover,
    );
    await this.novelRoomRepository.saveRow(room);
    return room;
  }
  /**
   * 소설 공방 연재 완료
   */
  async completedNovelRoom(id: number): Promise<void> {
    const novelRoom = await this.novelRoomRepository.getById(id);
    novelRoom.setCompletedAt();
    await this.novelRoomRepository.saveRow(novelRoom);
  }
}
