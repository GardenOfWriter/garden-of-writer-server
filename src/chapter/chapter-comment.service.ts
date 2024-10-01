import { ChapterCommentRepo, ChapterCommentRepository } from './repository/chapter-comment.repository';
import { ChapterCommentEntity } from './entities/chapter-comment.entity';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { Injectable, Logger } from '@nestjs/common';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';

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
    @ChapterCommentRepo()
    private readonly chapterCommentRepository: ChapterCommentRepository,
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
