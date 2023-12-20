import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNovelRoomDto } from 'src/novel-room/dto/create-novel-room.dto';
import { UpdateNovelRoomDto } from 'src/novel-room/dto/update-novel-room.dto';

import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { NovelRoomService } from 'src/novel-room/novel-room.service';

@Controller('novel-room')
export class NovelRoomController {
  constructor(private readonly novelRoomService: NovelRoomService) {}

  @Post()
  async createRoomTest(
    @Body() createNovelRoomDto: CreateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    return await this.novelRoomService.createRoomTest(createNovelRoomDto);
  }

  @Post(':userId/create-room')
  async createRoom(
    @Body() createNovelRoomDto: CreateNovelRoomDto,
    @Param('userId') userId: number,
  ): Promise<NovelRoomEntity> {
    createNovelRoomDto.userId = userId;
    console.log(userId);
    return this.novelRoomService.createRoom(createNovelRoomDto);
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
