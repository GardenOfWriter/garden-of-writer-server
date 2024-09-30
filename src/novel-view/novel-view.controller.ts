import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';

import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';

import { NovelTextService } from '@app/novel-text/novel-text.service';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { ChapterService } from '@app/chapter/chapter.service';
import { FindChapter } from '@app/chapter/decorator/swagger.decorator';
import { FindByNovelRoomIdDto } from '@app/chapter/dto/request/findby-novel-room-id.dto';
import { FindAllNovelViewRequestDto } from './dto/request/find-all-novel-request.dto';

@ApiTags('소설 회차 View [피그마 7번 관련]')
@Controller('novel-view')
// @ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
// @UseGuards(JwtGuard)
export class NovelViewController {
  constructor(
    private readonly novelRoomService: NovelRoomService,
    private chapterService: ChapterService,
    private readonly novelTextService: NovelTextService,
  ) {}

  @Get()
  async findByNovelRooms(@Query() dto: FindAllNovelViewRequestDto) {
    return await this.novelRoomService.getNovelRoomByCompleteAt(dto);
  }
  @Get('/novel/:novelRoomId')
  @FindChapter()
  async findChpater(@Param('novelRoomId', ParseIntPipe) novelRoomId: number, @Query() dto: BasePaginationRequest) {
    return this.chapterService.findChapterText({ novelRoomId, chunkSize: dto.chunkSize, pageNo: dto.pageNo } as FindByNovelRoomIdDto);
  }

  @Get('/chapter/:chapterId')
  @FindChapter()
  async updateChapter(@Param('chapterId') chapterId: number) {
    return await this.novelTextService.findByChapterId(chapterId);
  }
}
