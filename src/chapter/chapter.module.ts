import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterEntity } from './entities/chapter.entity';
import { ChapterRepositoryProvider } from './repository/chapter.repository';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomRepositoryProvider } from '@app/novel-room/repository/novel-room.repository';
import { ChapterLikeRepositoryProvider } from './repository/chapter-like.repository';
import { ChapterCommentRepositoryProvider } from './repository/chapter-comment.repository';
import { ChapterLikeEntity } from './entities/chapter-like.entity';
import { ChapterCommentEntity } from './entities/chapter-comment.entity';
import { ChapterCommentService } from './chapter-comment.service';
import { ChapterLikeService } from './chapter-like.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity, ChapterLikeEntity, ChapterCommentEntity, NovelRoomEntity])],
  controllers: [ChapterController],
  providers: [
    ChapterService,
    ChapterCommentService,
    ChapterLikeService,
    ChapterRepositoryProvider,
    NovelRoomRepositoryProvider,
    ChapterLikeRepositoryProvider,
    ChapterCommentRepositoryProvider,
  ],
  exports: [
    ChapterService,
    ChapterCommentService,
    ChapterLikeService,
    ChapterRepositoryProvider,
    ChapterLikeRepositoryProvider,
    ChapterCommentRepositoryProvider,
  ],
})
export class ChapterModule {}
