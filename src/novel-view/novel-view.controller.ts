import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';

import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';

import { NovelTextService } from '@app/novel-text/novel-text.service';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { ChapterService } from '@app/chapter/chapter.service';
import { FindChapter } from '@app/chapter/decorator/swagger.decorator';
import { FindByNovelRoomIdDto } from '@app/chapter/dto/request/findby-novel-room-id.dto';
import { FindAllNovelViewRequestDto } from './dto/request/find-all-novel-request.dto';
import { ChapterCommentService } from '@app/chapter/chapter-comment.service';
import { ChapterLikeService } from '@app/chapter/chapter-like.service';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { UserEntity } from '@app/user/entities/user.entity';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterLikeEntity } from '@app/chapter/entities/chapter-like.entity';

@ApiTags('소설 회차 View [피그마 7번 관련]')
@Controller('novel-view')
// @ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
export class NovelViewController {
  constructor(
    private readonly novelRoomService: NovelRoomService,
    private readonly chapterService: ChapterService,
    private readonly novelTextService: NovelTextService,
    private readonly chapterCommentService: ChapterCommentService,
    private readonly chapterLikeService: ChapterLikeService,
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

  @Get('/comment/:chapterId')
  async findByChapterId(@Param('chapterId') chapterId: number) {
    return await this.chapterCommentService.findByChapterId(chapterId);
  }
  @UseGuards(JwtGuard)
  @Post('/comment/:chapterId')
  async saveComment(@Param('chapterId') chapterId: number, @Body() dto: any) {
    return await this.chapterCommentService.saveComment(dto);
  }
  @UseGuards(JwtGuard)
  @Post('/like/:chapterId')
  async saveLike(@Param('chapterId') chapterId: number, @CurrentUser() user: UserEntity) {
    return await this.chapterLikeService.saveLike({ chapter: { id: chapterId } as ChapterEntity, user } as ChapterLikeEntity);
  }
  @UseGuards(JwtGuard)
  @Delete('/like/:chapterId')
  async deletLike(@Param('chapterId') chapterId: number, @CurrentUser() user: UserEntity) {
    return await this.chapterLikeService.deleteLike(chapterId);
  }
}
