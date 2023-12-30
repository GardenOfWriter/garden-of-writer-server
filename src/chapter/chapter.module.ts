import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterEntity } from './entities/chapter.entity';
import { ChapterRepositoryToken } from './repository/chapter.repository';
import { ChapterRepositoryImpl } from './repository/chapter.repository.impl';
import { ChapterSubscriber } from './subscriber/chapter.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  controllers: [ChapterController],
  providers: [
    ChapterService,
    ChapterSubscriber,
    {
      provide: ChapterRepositoryToken,
      useClass: ChapterRepositoryImpl,
    },
  ],
})
export class ChapterModule {}
