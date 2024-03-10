import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterEntity } from './entities/chapter.entity';
import { ChapterSubscriber } from './subscriber/chapter.subscriber';
import { ChapterRepositoryProvider } from './repository/chapter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterSubscriber, ChapterRepositoryProvider],
})
export class ChapterModule {}
