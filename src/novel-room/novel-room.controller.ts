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
  async createRoom(
    @Body() createNovelRoomDto: CreateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    return await this.novelRoomService.createRoom(createNovelRoomDto);
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
    @Body() UpdateNovelRoomDto: UpdateNovelRoomDto,
  ): Promise<NovelRoomEntity> {
    return this.novelRoomService.updateRoom(id, UpdateNovelRoomDto);
  }
}
