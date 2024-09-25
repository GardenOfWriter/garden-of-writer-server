import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterEntity } from './entities/chapter.entity';
import { ChapterRepositoryProvider } from './repository/chapter.repository';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomRepositoryProvider } from '@app/novel-room/repository/novel-room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity, NovelRoomEntity])],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepositoryProvider, NovelRoomRepositoryProvider],
  exports: [ChapterService, ChapterRepositoryProvider],
})
export class ChapterModule {}
