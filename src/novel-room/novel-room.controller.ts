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

import { CaslGuard } from '@app/auth/guard/casl.guard';
import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { ActionEnum, AppAbility } from '@app/commons/abilities/ability.factory';
import { CaslAbility } from '@app/commons/decorator/casl.decorator';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryRunner as QR } from 'typeorm';

import { FindAttendQueryDto } from './dto/request/find-attend-query.dto';
import {
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

  @ApiOperation({
    summary: '소설 공방 개설',
  })
  // @UseInterceptors(TransactionInterceptor)
  @Post('')
  async createRoom(
    @Body() dto: CreateNovelRoomDto,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    dto.setUserId(user);
    const room = await this.novelRoomService.createRoom(dto);
    await this.novelAttendBoardService.create(dto.toAttendBoardEntity(room.id));
    await this.novelTagService.createTag(dto.novelTags, room.id);
    return;
  }

  @FindAllNovelRoom()
  @Get()
  async findAllRooms(
    @CurrentUser() user: UserEntity,
    @Query() query: FindAttendQueryDto,
  ): Promise<PagingationResponse<FindAttendStatusNovelRoomDto>> {
    return this.novelRoomService.findAllRooms(user, query);
  }

  @FindByDetailNovelRoom()
  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    return this.novelRoomService.getById(id);
  }

  @ApiOperation({
    summary: '소설 공방 삭제(방장만 가능)',
  })
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

  @UpdateNovelRoom()
  @Patch(':id')
  @UseGuards(CaslGuard)
  async updateRoom(
    @Param('id') id: number,
    @Body() updateNovelRoomDto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    return this.novelRoomService.updateRoom(id, updateNovelRoomDto);
  }
}
