import { Module } from '@nestjs/common';
import { NovelController } from './novel.controller';
import { NovelService } from './novel.service';

@Module({
  controllers: [NovelController],
  providers: [NovelService],
})
export class NovelModule {}
