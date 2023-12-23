import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { NovelWriterController } from './novel-writer.controller';
import { NovelWriterService } from './novel-writer.service';
import { NovelWriterRepository } from './repository/novel-writer.repository';
import { NovelWriterRepositoryImpl } from './repository/novel-writer.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([NovelWriterEntity])],
  controllers: [NovelWriterController],
  providers: [
    NovelWriterService,
    {
      provide: NovelWriterRepository,
      useClass: NovelWriterRepositoryImpl,
    },
  ],
})
export class NovelWriterModule {}
