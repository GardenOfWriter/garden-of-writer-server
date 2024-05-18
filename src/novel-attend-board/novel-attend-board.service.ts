import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { FindAllNovelAttendBoardDto } from './dto/response/findall.dto';
import { NovelAttendBoardEntity } from './entities/novel-attend-board.entity';
import { NovelAttendBoardRepository, NovelAttendBoardRepositryToken } from './repository/novel-attend-board.repository';
import { NovelRoomRepository, NovelRoomRepositoryToken } from '@app/novel-room/repository/novel-room.repository';
import { FindAttendBoardDto } from './dto/request/find-attend-board.dto';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { FindByIdLikeUserDto } from './dto/response/findby-id-like-user.dto';
import { BoardLikeEntity } from './entities/board-like.entity';
import { CreateBoardLikeDto } from './dto/request/create-board-like.dto';
import { AlreadBoardLikeException } from './exception/already-board-like.exception';
import { UpdateNovelRoomDto } from '@app/novel-room/dto/request/update-novel-room.dto';

@Injectable()
export class NovelAttendBoardService {
  constructor(
    @Inject(NovelAttendBoardRepositryToken)
    private boardRepo: NovelAttendBoardRepository,
    @Inject(NovelRoomRepositoryToken)
    private novelRoomRepository: NovelRoomRepository,
  ) {}

  async create(entity: Partial<NovelAttendBoardEntity>) {
    await this.boardRepo.addRow(entity);
    return;
  }

  async findAll(dto: FindAttendBoardDto, user: UserEntity) {
    const [rooms, totalCount] = await this.novelRoomRepository.findAllJoinBoardWithBoardLikeAndCount(user, dto);
    const items = rooms.map((room) => new FindAllNovelAttendBoardDto(user, room));
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }

  async findById(roomId: number, user: UserEntity): Promise<FindByIdLikeUserDto> {
    const board = await this.boardRepo.findByIdWhereLikeUser(roomId);
    const hasBoard = await this.boardRepo.hasBoardLike(user.id, roomId);
    return new FindByIdLikeUserDto(board, hasBoard);
  }

  async createBoardLike(dto: CreateBoardLikeDto, user: UserEntity): Promise<void> {
    const hasBoard = await this.boardRepo.hasBoardLike(user.id, dto.novelRoomId);
    if (hasBoard) throw new AlreadBoardLikeException();
    await this.boardRepo.createBoardLike(dto.toBoardLikeEntity(user));
    return;
  }

  async updateBoard(roomId: number, dto: UpdateNovelRoomDto, user: UserEntity) {
    const board = await this.boardRepo.findById(roomId);
    if (!board) throw new NotFoundException('일치하는 게시글이 없습니다.');
    board.updateBoard(dto.attendTitle, dto.attendContent, dto.attendOpenKakaoLink);
    await this.boardRepo.updateRow(roomId, board);
    return;
  }
}
