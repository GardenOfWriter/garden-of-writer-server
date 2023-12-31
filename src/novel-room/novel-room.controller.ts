import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNovelRoomDto } from 'src/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from 'src/novel-room/dto/update-novel-room.dto';

import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { QueryRunner } from '@app/commons/decorator/query-runner.decorator';
import { userEntity } from '@app/user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { NovelRoomService } from 'src/novel-room/novel-room.service';
import { QueryRunner as QR } from 'typeorm';
import { TransactionInterceptor } from '../commons/interceptor/transaction.interceptor';
import { FindAttendQueryDto } from './dto/request/find-attend-query.dto';
@ApiTags('소설 공방')
@Controller('novel-room')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelRoomController {
  constructor(private readonly novelRoomService: NovelRoomService) {}

  @UseInterceptors(TransactionInterceptor)
  @Post('/create-room')
  async createRoom(
    @Body() createNovelRoomDto: CreateNovelRoomDto,
    @CurrentUser() user: userEntity,
    @QueryRunner() qr?: QR,
  ): Promise<void> {
    createNovelRoomDto.setUserId(user);
    await this.novelRoomService.createRoom(createNovelRoomDto);
    return;
  }
  @ApiOperation({
    summary: '소설 공방 리스트 출력',
  })
  @Get()
  async getAll(
    @CurrentUser() user: userEntity,
    @Query() query: FindAttendQueryDto,
  ): Promise<NovelRoomEntity[]> {
    return this.novelRoomService.getAllRooms(user, query);
  }

  @Get(':id')
  getRoomById(@Param('id') id: string) {
    return this.novelRoomService.getById(+id);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string): Promise<void> {
    return this.novelRoomService.deleteRoom(+id);
  }

  @Patch(':id')
  async updateRoom(
    @Param('id') id: number,
    @Body() updateNovelRoomDto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    return this.novelRoomService.updateRoom(id, updateNovelRoomDto);
  }
}
