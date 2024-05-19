import { CreateNovelRoomDto } from '@app/novel-room/dto/request/create-novel-room.dto';
import { UpdateNovelRoomDto } from '@app/novel-room/dto/request/update-novel-room.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAttendQueryDto } from './dto/request/find-attend-query.dto';
import {
  ComplateNovelRoom,
  CreateNovelRoom,
  DeleteNovelRoom,
  FindAllNovelRoom,
  FindByDetailNovelRoom,
  UpdateNovelRoom,
} from './decorator/swagger.decorator';
import { NovelAttendBoardService } from '@app/novel-attend-board/novel-attend-board.service';
import { NovelTagService } from '../novel-tag/novel-tag.service';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { FindAttendStatusNovelRoomDto } from './dto/response/find-attend-status.dto';
import { TransactionInterceptor } from '@app/commons/interceptor/transaction.interceptor';
import { QueryRunner } from '@app/commons/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@ApiTags('소설 공방')
@Controller('novel-room')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelRoomController {
  constructor(
    private readonly novelRoomService: NovelRoomService,
    private readonly novelAttendBoardService: NovelAttendBoardService,
    private readonly novelTagService: NovelTagService,
  ) {}
  /**
   * 소설 공방 생성
   */
  @UseInterceptors(TransactionInterceptor)
  @CreateNovelRoom()
  @Post('')
  async createRoom(@Body() dto: CreateNovelRoomDto, @CurrentUser() user: UserEntity, @QueryRunner() qr: QR): Promise<void> {
    const room = await this.novelRoomService.createRoom(dto, user);
    await this.novelAttendBoardService.create(dto.toAttendBoardEntity(room.id));
    await this.novelTagService.saveTag(dto.novelTags, room.id);
    return;
  }

  /**
   * 소설 공방 목록 조회
   */

  @FindAllNovelRoom()
  @Get()
  async findAllRooms(
    @CurrentUser() user: UserEntity,
    @Query() query: FindAttendQueryDto,
  ): Promise<PagingationResponse<FindAttendStatusNovelRoomDto>> {
    return this.novelRoomService.findAllRooms(user, query);
  }
  /**
   * 소설 공방 상세 조회
   */
  @FindByDetailNovelRoom()
  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: UserEntity) {
    return this.novelRoomService.findById(id, user);
  }
  /**
   * 소설 공방 삭제
   */
  @DeleteNovelRoom()
  @Delete(':id')
  async deleteRoom(@Param('id') id: string, user: UserEntity, room: NovelRoomEntity): Promise<void> {
    await this.novelRoomService.deleteRoom(room.id);
  }
  /**
   * 소설 공방 연재 완료 처리
   */
  @ComplateNovelRoom()
  @Patch(':id')
  async completedNovelRoom(@Param('id', ParseIntPipe) id: number): Promise<NovelRoomEntity> {
    await this.novelRoomService.completedNovelRoom(id);
    return;
  }

  /**
   * 소설 공방 수정 컨트롤러
   *
   * @async
   * @param {number} id 소설 공방 id
   * @param {UpdateNovelRoomDto} dto 수정할 소설 공방 정보
   * @param {UserEntity} user 사용자 정보
   * @param {QR} qr QueryRunner 트랜잭션
   * @returns {Promise<NovelRoomEntity>} 수정된 소설 공방 정보
   */
  @UseInterceptors(TransactionInterceptor)
  @UpdateNovelRoom()
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNovelRoomDto,
    @CurrentUser() user: UserEntity,
    @QueryRunner() qr: QR,
  ): Promise<NovelRoomEntity> {
    const room = await this.novelRoomService.updateRoom(id, dto);
    await this.novelAttendBoardService.updateBoard(id, dto, user);
    await this.novelTagService.updateTags(dto.novelTags, room.id);
    return;
  }
}
