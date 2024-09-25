import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { FindChapterRoomIdResDto } from './dto/response/findbychapter-id.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { FindByNovelRoomIdDto } from './dto/request/findby-novel-room-id.dto';
import { ChapterRepo, ChapterRepository } from './repository/chapter.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { ChangeTitleDto } from './dto/request/change-title.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { isEmpty } from '../commons/util/data.helper';
import { NotFoundChapterException, NotWritingChapterException } from './exception/chpater.exception';
import { ChapterStatusEnum } from './entities/enums/chapter-status.enum';
import { CreateChapterRequestDto } from './dto/request/create-chapter.dto';
import { NovelRoomRepo, NovelRoomRepository } from '@app/novel-room/repository/novel-room.repository';
import { NovelRoomStatusEnum } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { ChapterLikeRepo, ChapterLikeRepository } from './repository/chapter-like.repository';
import { ChapterLikeEntity } from './entities/chapter-like.entity';
import { ChapterCommentRepository } from './repository/chapter-comment.repository';
import { ChapterCommentEntity } from './entities/chapter-comment.entity';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';

/**
 * 회차 댓글 서비스 클래스
 *
 * @export
 * @class ChapterService  회차 서비스 클래스
 * @typedef {ChapterCommentService} ChapterCommentService
 */
@Injectable()
export class ChapterCommentService {
  private logger = new Logger(ChapterCommentService.name);

  constructor(
    @ChapterLikeRepo()
    private readonly chapterCommentRepository: ChapterCommentRepository,
    @ChapterRepo()
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async findByChapterId(chapterId: number, dto: BasePaginationRequest): Promise<PagingationResponse<ChapterCommentEntity>> {
    const [comments, totalCount] = await this.chapterCommentRepository.findByChapterIdPaging(chapterId, dto);
    return new PagingationResponse(totalCount, dto.chunkSize, comments);
  }

  async saveComment(comment: ChapterCommentEntity): Promise<void> {
    await this.chapterCommentRepository.saveRow(comment);
  }

  async deleteComment(commentId: number): Promise<void> {
    await this.chapterCommentRepository.deleteComment(commentId);
  }
}
