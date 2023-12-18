import { Module } from '@nestjs/common';
import { NovelBoardController } from './novel-board.controller';

@Module({
  imports: [],
  controllers: [NovelBoardController],
  providers: [],
})
export class NovelBoardModule {}
