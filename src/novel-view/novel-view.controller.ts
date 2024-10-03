import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { NovelTextService } from '@app/novel-text/novel-text.service';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { ChapterService } from '@app/chapter/chapter.service';
import { FindChapter } from '@app/chapter/decorator/swagger.decorator';
import { FindByNovelRoomIdDto } from '@app/chapter/dto/request/findby-novel-room-id.dto';
import { ChapterCommentService } from '@app/chapter/chapter-comment.service';
import { ChapterLikeService } from '@app/chapter/chapter-like.service';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { UserEntity } from '@app/user/entities/user.entity';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterLikeEntity } from '@app/chapter/entities/chapter-like.entity';
import { CreateChapterCommentReqDto } from './dto/request/create-comment-req.dto';
import { DeleteLike, FindAllNovelView, FindCommentByChapterId, FindTextByChapterId, SaveComment, SaveLike } from './decorator/novel-view.decorator';
import { FindAllNovelViewReqDto } from './dto/request/find-novel-view-req.dto';

@ApiTags('소설 회차 View [피그마 7번 관련]')
@Controller('novel-view')
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
  @FindAllNovelView()
  @Get()
  async findByNovelRooms(@Query() dto: FindAllNovelViewReqDto) {
    return await this.novelRoomService.findByStatusJoinWriters(dto);
  }

  @FindChapter()
  @Get('/novel/:novelRoomId')
  async findChpater(@Param('novelRoomId', ParseIntPipe) novelRoomId: number, @Query() dto: BasePaginationRequest) {
    return this.chapterService.findChapterText({ novelRoomId, chunkSize: dto.chunkSize, pageNo: dto.pageNo } as FindByNovelRoomIdDto);
  }

  @FindTextByChapterId()
  @Get('/chapter/:chapterId')
  async findByChapterId(@Param('chapterId') chapterId: number) {
    return await this.novelTextService.findByChapterId(chapterId);
  }

  @FindCommentByChapterId()
  @Get('/comment/:chapterId')
  async findCommentByChapterId(@Param('chapterId') chapterId: number, @Query() dto: BasePaginationRequest) {
    return await this.chapterCommentService.findByChapterId(chapterId, dto);
  }
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtGuard)
  @SaveComment()
  @Post('/comment/:chapterId')
  async saveComment(@Param('chapterId', ParseIntPipe) chapterId: number, @Body() dto: CreateChapterCommentReqDto, @CurrentUser() user: UserEntity) {
    return await this.chapterCommentService.saveComment({ dto, chapterId, user });
  }
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtGuard)
  @SaveLike()
  @Post('/like/:chapterId')
  async saveLike(@Param('chapterId') chapterId: number, @CurrentUser() user: UserEntity) {
    return await this.chapterLikeService.saveLike({ chapter: { id: chapterId } as ChapterEntity, user } as ChapterLikeEntity);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtGuard)
  @DeleteLike()
  @Delete('/like/:chapterId')
  async deletLike(@Param('chapterId') chapterId: number, @CurrentUser() user: UserEntity) {
    return await this.chapterLikeService.deleteLike(chapterId);
  }
}
