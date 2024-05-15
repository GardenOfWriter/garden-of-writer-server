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
} from '@nestjs/common';

import { CaslGuard } from '@app/auth/guard/casl.guard';
import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { ActionEnum, AppAbility } from '@app/commons/abilities/ability.factory';
import { CaslAbility } from '@app/commons/decorator/casl.decorator';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @CreateNovelRoom()
  @Post('')
  async createRoom(
    @Body() dto: CreateNovelRoomDto,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
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
  getRoomById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.novelRoomService.getById(id, user);
  }
  /**
   * 소설 공방 삭제
   */

  @DeleteNovelRoom()
  @Delete(':id')
  @UseGuards(CaslGuard)
  async deleteRoom(
    @Param('id') id: string, //
    @CaslAbility() ability: AppAbility,
    user: UserEntity,
    room: NovelRoomEntity,
  ): Promise<void> {
    if (ability && ability.can(ActionEnum.Delete, 'all')) {
      await this.novelRoomService.deleteRoom(room.id);
    }
  }
  /**
   * 소설 공방 연재 완료 처리
   */
  @ComplateNovelRoom()
  @Patch(':id')
  async completedNovelRoom(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NovelRoomEntity> {
    await this.novelRoomService.completedNovelRoom(id);
    return;
  }
  /**
   * 소설 공방 정보 수정
   */
  @UpdateNovelRoom()
  @Put(':id')
  async updateNovelRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    const room = await this.novelRoomService.updateRoom(id, dto);
    await this.novelTagService.updateTags(dto.novelTags, room.id);
    return;
  }
}
