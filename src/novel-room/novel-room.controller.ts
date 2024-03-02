import { CreateNovelRoomDto } from '@app/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from '@app/novel-room/dto/update-novel-room.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
} from './decorator/swagger.decorator';

@ApiTags('소설 공방')
@Controller('novel-room')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelRoomController {
  constructor(private readonly novelRoomService: NovelRoomService) {}

  @ApiOperation({
    summary: '소설 공방 개설',
  })
  // @UseInterceptors(TransactionInterceptor)
  @Post('')
  async createRoom(
    @Body() createNovelRoomDto: CreateNovelRoomDto,
    @CurrentUser() user: UserEntity,
    // @QueryRunner() qr?: QR,
  ): Promise<void> {
    createNovelRoomDto.setUserId(user);
    await this.novelRoomService.createRoom(createNovelRoomDto);
    return;
  }

  @FindAllNovelRoom()
  @Get()
  async findAllRooms(
    @CurrentUser() user: UserEntity,
    @Query() query: FindAttendQueryDto,
  ): Promise<NovelRoomEntity[]> {
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

  @ApiOperation({
    summary: '소설 공방 수정(방장만 가능)',
  })
  @Patch(':id')
  @UseGuards(CaslGuard)
  async updateRoom(
    @Param('id') id: number,
    @Body() updateNovelRoomDto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    return this.novelRoomService.updateRoom(id, updateNovelRoomDto);
  }
}
