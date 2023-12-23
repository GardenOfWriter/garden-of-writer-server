import { Module } from '@nestjs/common';
import { NovelBoardController } from './novel-attend-board.controller';

@Module({
  imports: [],
  controllers: [NovelBoardController],
  providers: [],
})
export class NovelBoardModule {}
