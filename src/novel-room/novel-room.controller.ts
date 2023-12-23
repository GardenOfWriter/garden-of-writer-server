import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNovelRoomDto } from 'src/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from 'src/novel-room/dto/update-novel-room.dto';

import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { NovelRoomService } from 'src/novel-room/novel-room.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/commons/decorator/current-user.decorater';
import { userEntity } from '@app/user/entities/user.entity';
import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { TransactionInterceptor } from '../commons/interceptor/transaction.interceptor';
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
  constructor(private readonly novelRoomService: NovelRoomService) {}

  @Post()
  async createRoomTest(
    @Body() createNovelRoomDto: CreateNovelRoomDto,
  ): Promise<void> {
    await this.novelRoomService.createRoomTest(createNovelRoomDto);
    return;
  }
  @UseInterceptors(TransactionInterceptor)
  @Post('/create-room')
  async createRoom(
    @Body() createNovelRoomDto: CreateNovelRoomDto,
    @CurrentUser() user: userEntity,
    @QueryRunner() qr?: QR,
  ): Promise<string> {
    createNovelRoomDto.setUserId(user);
    await this.novelRoomService.createRoomTest(createNovelRoomDto);
    return;
  }

  @Get()
  async getAll(): Promise<NovelRoomEntity[]> {
    return this.novelRoomService.getAllRooms();
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
