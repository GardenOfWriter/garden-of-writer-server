import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { FindAllNovelAttendBoardDto } from './dto/response/findall.dto';
import { NovelAttendBoardEntity } from './entities/novel-attend-board.entity';
import { NovelAttendBoardRepository, NovelRoomBoardRepo } from './repository/novel-attend-board.repository';
import { NovelRoomRepo, NovelRoomRepository } from '@app/novel-room/repository/novel-room.repository';
import { FindAttendBoardDto } from './dto/request/find-attend-board.dto';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { FindByIdLikeUserDto } from './dto/response/findby-id-like-user.dto';
import { CreateBoardLikeDto } from './dto/request/create-board-like.dto';
import { AlreadBoardLikeException } from './exception/already-board-like.exception';
import { UpdateNovelRoomDto } from '@app/novel-room/dto/request/update-novel-room.dto';
import { NovelWriterRepo, NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';

@Injectable()
export class NovelAttendBoardService {
  constructor(
    @NovelRoomBoardRepo()
    private boardRepo: NovelAttendBoardRepository,
    @NovelRoomRepo()
    private novelRoomRepo: NovelRoomRepository,
    @NovelWriterRepo()
    private novelWriterRepo: NovelWriterRepository,
  ) {}

  /**
   * 공방 모집 게시글 생성
   *
   * @async
   * @param {Partial<NovelAttendBoardEntity>} entity 게시글 엔티티
   * @returns {Promise<void>}
   */
  async create(entity: Partial<NovelAttendBoardEntity>): Promise<void> {
    await this.boardRepo.addRow(entity);
    return;
  }

  /**
   * 공방 모집 게시글 조회
   *
   * @async
   * @param {FindAttendBoardDto} dto 게시글 조회 DTO
   * @param {UserEntity} user  유저 정보 엔티티
   * @return {Promise<PagingationResponse<FindAllNovelAttendBoardDto>>} 조회된 게시글 DTO (페이지 처리)
   */
  async findAll(dto: FindAttendBoardDto, user: UserEntity): Promise<PagingationResponse<FindAllNovelAttendBoardDto>> {
    const [rooms, totalCount] = await this.novelRoomRepo.findAllJoinBoardWithBoardLikeAndCount(user, dto);
    const items = rooms.map((room) => new FindAllNovelAttendBoardDto(user, room));
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }

  /**
   *  게시글 조회 (유저 좋아요 여부 포함)
   *
   * @async
   * @param {number} novelRoomId 소설 공방 Id
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {Promise<FindByIdLikeUserDto>} 조회된 게시글 DTO
   */
  async findById(novelRoomId: number, user: UserEntity): Promise<FindByIdLikeUserDto> {
    const board = await this.boardRepo.findByIdWhereLikeUserJoinNovelRoom(novelRoomId);
    const writers = await this.novelWriterRepo.findByNovelRoomId(novelRoomId);
    const hasBoard = await this.boardRepo.hasBoardLike(user.id, novelRoomId);
    return new FindByIdLikeUserDto(board, hasBoard, writers);
  }

  /**
   * 게시글 좋아요 생성
   *
   * @async
   * @param {CreateBoardLikeDto} dto  게시글 좋아요 생성 DTO
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {Promise<void>}
   */
  async createBoardLike(dto: CreateBoardLikeDto, user: UserEntity): Promise<void> {
    const hasBoard = await this.boardRepo.hasBoardLike(user.id, dto.novelRoomId);
    if (hasBoard) throw new AlreadBoardLikeException();
    await this.boardRepo.createBoardLike(dto.toBoardLikeEntity(user));
    return;
  }

  /**
   * 공방 모집 게시글 수정
   *
   * @async
   * @param {number} novelRoomId 공방 방 Id
   * @param {UpdateNovelRoomDto} dto 수정할 공방 정보 DTO
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {Promise<void>}
   */
  async updateBoard(novelRoomId: number, dto: UpdateNovelRoomDto, user: UserEntity): Promise<void> {
    const board = await this.boardRepo.findById(novelRoomId);
    if (!board) throw new NotFoundException('일치하는 게시글이 없습니다.');
    board.updateBoard(dto.attendTitle, dto.attendContent, dto.attendOpenKakaoLink);
    await this.boardRepo.updateRow(novelRoomId, board);
    return;
  }
}
