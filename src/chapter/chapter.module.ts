import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterEntity } from './entities/chapter.entity';
import { ChapterRepository } from './repository/chapter.repository';
import { ChapterRepositoryImpl } from './repository/chapter.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  controllers: [ChapterController],
  providers: [
    ChapterService,
    {
      provide: ChapterRepository,
      useClass: ChapterRepositoryImpl,
    },
  ],
})
export class ChapterModule {}
