import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelTextController } from './novel-text.controller';
import { NovelTextService } from './novel-text.service';
import { NovelTextEntity } from './entities/novel-text.entity';
import { NovelTextRepository } from './repository/novel-text.repository';
import { NovelTextRepositoryImpl } from './repository/novel-text.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([NovelTextEntity])],
  controllers: [NovelTextController],
  providers: [
    NovelTextService,
    {
      provide: NovelTextRepository,
      useClass: NovelTextRepositoryImpl,
    },
  ],
})
export class NovelTextModule {}
