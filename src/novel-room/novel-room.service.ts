import { ChapterRepo } from '@app/chapter/repository/chapter.repository';
import { NovelWriterRepo, NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateNovelRoomDto } from '@app/novel-room/dto/request/create-novel-room.dto';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { ChapterRepository } from '../chapter/repository/chapter.repository';
import { FindAttendQueryDto } from './dto/request/find-attend-query.dto';
import { FindAttendStatusNovelRoomDto } from './dto/response/find-attend-status.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { FindByRoomIdDetailDto } from './dto/response/findbyid-detail.dto';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { NovelRoomRepo, NovelRoomRepository } from './repository/novel-room.repository';
import {
  NovelRoomAlreadyComplatedException,
  NovelRoomDuplicationTitleException,
  NovelRoomNotFoundException,
} from './exceptions/novel-room.exception';

/**
 * 소설 공방 서비스
 *
 * @export
 * @class NovelRoomService
 * @typedef {NovelRoomService}
 * @property {Logger} logger Logger 객체
 * @property {NovelRoomRepository} novelRoomRepo 공방 레포지토리
 * @property {NovelWriterRepository} novelWriterRepo 작가관리 레포지토리
 * @property {ChapterRepository} chapterRepo 회차 관리 레포지토리
 *
 */
@Injectable()
export class NovelRoomService {
  private logger = new Logger(NovelRoomService.name);
  constructor(
    @NovelRoomRepo()
    private readonly novelRoomRepo: NovelRoomRepository,
    @NovelWriterRepo()
    private readonly novelWriterRepo: NovelWriterRepository,
    @ChapterRepo()
    private readonly chapterRepo: ChapterRepository,
  ) {}

  /**
   * 소설 공방 목록 조회
   *
   * @async
   * @param {UserEntity} user 사용자 정보
   * @param {FindAttendQueryDto} dto  조회할 소설 공방 정보
   * @returns {Promise<PagingationResponse<FindAttendStatusNovelRoomDto>>} 조회된 소설 공방 목록 (페이징 처리)
   */
  async findAllRooms(user: UserEntity, dto: FindAttendQueryDto): Promise<PagingationResponse<FindAttendStatusNovelRoomDto>> {
    const roomFilter = dto.queryConvertStatus();
    const [rooms, totalCount] = await this.novelRoomRepo.findAllJoinWriterByStatus(user, roomFilter, dto);
    const items = rooms.map((room: NovelRoomEntity) => new FindAttendStatusNovelRoomDto(user, room));
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }
  /**
   * 소설 공방 생성
   *
   * @async
   * @param {CreateNovelRoomDto} dto 생성할 소설 공방 정보
   * @param {UserEntity} user 사용자 정보
   * @returns {Promise<NovelRoomEntity>} 생성된 소설 공방 정보
   */
  async createRoom(dto: CreateNovelRoomDto, user: UserEntity): Promise<NovelRoomEntity> {
    const checkTitle = await this.novelRoomRepo.existTitle(dto.title);
    if (checkTitle) throw new NovelRoomDuplicationTitleException();
    const room = dto.toRoomEntity(user);
    await this.novelRoomRepo.saveRow(room);
    const writer = dto.toWriterEntity(room.id, user);
    const chapter = dto.toChapterEntity(room.id, user);
    await Promise.all([await this.novelWriterRepo.saveRow(writer), await this.chapterRepo.saveRow(chapter)]);
    return room;
  }
  /**
   * 소설 공방 상세 조회
   *
   * @async
   * @param {number} id 소설 공방 id
   * @param {UserEntity} user 사용자 정보
   * @returns {Promise<FindByRoomIdDetailDto>} 소설 공방 상세 정보
   */
  async getById(id: number, user: UserEntity): Promise<FindByRoomIdDetailDto> {
    const room = await this.novelRoomRepo.getByIdWithTag(id);
    if (!room) throw new NovelRoomNotFoundException();
    return new FindByRoomIdDetailDto(room, user);
  }

  /**
   * 소설 공방 삭제
   * @async
   * @param {number} id 소설 공방 id
   * @returns {Promise<void>} 삭제 성공 여부
   */
  async deleteRoom(id: number): Promise<void> {
    await this.novelRoomRepo.deleteRow(id);
  }

  /**
   * 소설 공방 수정
   * @async
   * @param {number} id
   * @param {Partial<NovelRoomEntity>} updateNovelRoom 수정할 소설 공방 정보
   * @returns {Promise<NovelRoomEntity>} 수정된 소설 공방 정보
   */
  async updateRoom(id: number, updateNovelRoom: Partial<NovelRoomEntity>): Promise<NovelRoomEntity> {
    const room = await this.novelRoomRepo.getById(id);
    if (!room) throw new NovelRoomNotFoundException();
    room.updateRoom(updateNovelRoom);
    this.logger.log(`NovelRoom Update Data : ${JSON.stringify(room)}`);
    await this.novelRoomRepo.saveRow(room);
    return room;
  }

  /**
   * 소설 공방 완결 처리
   * @async
   * @param {number} id 소설 공방 id
   * @returns {Promise<void>} 완결 처리 성공 여부
   */
  async completedNovelRoom(id: number): Promise<void> {
    const novelRoom = await this.novelRoomRepo.getById(id);
    if (novelRoom.checkCompleted()) {
      throw new NovelRoomAlreadyComplatedException();
    }
    novelRoom.setCompletedAt();
    await this.novelRoomRepo.saveRow(novelRoom);
  }
}
