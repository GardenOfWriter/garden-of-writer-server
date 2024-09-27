import { Inject, Provider } from '@nestjs/common';
import { ChapterLikeEntity } from '../entities/chapter-like.entity';
import { ChapterLikeRepositoryImpl } from './chapter-like.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';

export const ChapterLikeRepositoryToken = 'ChapterLikeRepositoryToken';

export const ChapterLikeRepo = () => {
  return Inject(ChapterLikeRepositoryToken);
};

export const ChapterLikeRepositoryProvider: Provider = {
  provide: ChapterLikeRepositoryToken,
  useClass: ChapterLikeRepositoryImpl,
};

export interface ChapterLikeRepository {
  /**
   * 회차 좋아요
   * @param {ChapterLikeEntity} chapterLike
   *
   */
  saveRow(chapterLike: ChapterLikeEntity): Promise<void>;

  /**
   * 회차 좋아요 조회
   *
   * @param {number} chapterId
   * @returns {Promise<ChapterLikeEntity[]>}
   */

  findByChapterId(chapterId: number): Promise<ChapterLikeEntity[]>;

  /**
   * 회차 좋아요 검사
   * @param {number} chapterId
   * @returns {Promise<ChapterLikeEntity[]>}
   */
  findByChapterIdAndUser({ chapterId, user }: { chapterId: number; user: UserEntity }): Promise<ChapterLikeEntity>;

  /**
   * 회차 좋아요 개수
   *
   * @param {number} chapterId
   * @returns {Promise<number>}
   */
  countByChapterId(chapterId: number): Promise<number>;

  /**
   * 좋아요 해제
   *
   * @param {number} chapterLikeId
   * @returns {Promise<void>}
   */
  deleteLike(likeId: number): Promise<void>;
}
