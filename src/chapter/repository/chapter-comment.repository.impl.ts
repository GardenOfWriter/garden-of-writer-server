import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChapterCommentRepository } from './chapter-comment.repository';
import { ChapterCommentEntity } from '../entities/chapter-comment.entity';

@Injectable()
export class ChapterCommentRepositoryImpl implements ChapterCommentRepository {
  constructor(
    @InjectRepository(ChapterCommentEntity)
    private dataSource: Repository<ChapterCommentEntity>,
  ) {}
  async saveRow(chapterComment: ChapterCommentEntity): Promise<void> {
    await this.dataSource.save(chapterComment);
  }
  async findByChapterId(chapterId: number): Promise<ChapterCommentEntity[]> {
    return await this.dataSource.find({ where: { _chapter: { id: chapterId } } });
  }

  async deleteComment(commentId: number): Promise<void> {
    await this.dataSource.delete({ id: commentId });
  }
}
