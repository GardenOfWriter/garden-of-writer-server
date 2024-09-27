import { Injectable } from '@nestjs/common';
import { ChapterLikeEntity } from '../entities/chapter-like.entity';
import { ChapterLikeRepository } from './chapter-like.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class ChapterLikeRepositoryImpl implements ChapterLikeRepository {
  constructor(
    @InjectRepository(ChapterLikeEntity)
    private dataSource: Repository<ChapterLikeEntity>,
  ) {}
  async findByChapterId(chapterId: number): Promise<ChapterLikeEntity[]> {
    return await this.dataSource.find({ where: { chapter: { id: chapterId } } });
  }
  async countByChapterId(chapterId: number): Promise<number> {
    return await this.dataSource.count({ where: { chapter: { id: chapterId } } });
  }

  async saveRow(chapterLike: ChapterLikeEntity): Promise<void> {
    await this.dataSource.save(chapterLike);
  }

  async deleteLike(likeId: number): Promise<void> {
    await this.dataSource.delete({ id: likeId });
  }

  async findByChapterIdAndUser({ chapterId, user }: { chapterId: number; user: UserEntity }): Promise<ChapterLikeEntity> {
    return await this.dataSource.findOne({ where: { chapter: { id: chapterId }, user: { id: user.id } } });
  }
}
