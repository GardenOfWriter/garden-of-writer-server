import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterEntity } from './entities/chapter.entity';
import { ChapterRepositoryProvider } from './repository/chapter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepositoryProvider],
})
export class ChapterModule {}
