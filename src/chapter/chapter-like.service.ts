import { ChapterRepo, ChapterRepository } from './repository/chapter.repository';
import { UserEntity } from '@app/user/entities/user.entity';
import { ChapterLikeRepo, ChapterLikeRepository } from './repository/chapter-like.repository';
import { ChapterLikeEntity } from './entities/chapter-like.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable, Logger } from '@nestjs/common';

/**
 * 회차 서비스 클래스
 *
 * @export
 * @class ChapterService  회차 서비스 클래스
 * @typedef {ChapterLikeService} ChapterLikeService
 */
@Injectable()
export class ChapterLikeService {
  private logger = new Logger(ChapterLikeService.name);

  constructor(
    @ChapterLikeRepo()
    private readonly chapterLikeRepository: ChapterLikeRepository,
    @ChapterRepo()
    private readonly chapterRepository: ChapterRepository,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async findByChapterId(chapterId: number): Promise<ChapterLikeEntity[]> {
    const likes = await this.chapterLikeRepository.findByChapterId(chapterId);
    return likes;
  }

  async saveLike({ chapterId, user }: { chapterId: number; user: UserEntity }): Promise<void> {
    const like = this.classMapper.map({ chapterId, user }, Object, ChapterLikeEntity);
    await this.chapterLikeRepository.saveRow(like);
  }

  async deleteLike(likeId: number): Promise<void> {
    await this.chapterLikeRepository.deleteLike(likeId);
  }
}
