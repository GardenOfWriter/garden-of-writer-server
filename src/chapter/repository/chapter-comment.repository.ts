import { Inject, Provider } from '@nestjs/common';
import { ChapterCommentEntity } from '../entities/chapter-comment.entity';
import { ChapterCommentRepositoryImpl } from './chapter-comment.repository.impl';

export const ChapterCommentRepositoryToken = 'ChapterCommentRepositoryToken';

export const ChapterCommentRepo = () => {
  return Inject(ChapterCommentRepositoryToken);
};

export const ChapterCommentRepositoryProvider: Provider = {
  provide: ChapterCommentRepositoryToken,
  useClass: ChapterCommentRepositoryImpl,
};

export interface ChapterCommentRepository {
  /**
   * 회차 댓글 달기
   * @param {ChapterLikeEntity} chapterLike
   *
   */
  saveRow(chapterComment: ChapterCommentEntity): Promise<void>;

  /**
   *  회차 뎃글 조회
   *
   * @param {number} chapterId
   * @returns {Promise<ChapterCommentEntity[]>}
   */

  findByChapterId(chapterId: number): Promise<ChapterCommentEntity[]>;

  /**
   * 좋아요 해제
   *
   * @param {number} chapterLikeId
   * @returns {Promise<void>}
   */
  deleteComment(commentId: number): Promise<void>;
}
