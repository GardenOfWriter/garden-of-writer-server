import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelRoomEntity } from '../novel-room/entities/novel-room.entity';
import { NovelAttendBoardEntity } from './entities/novel-attend-board.entity';
import { NovelAttendBoardController } from './novel-attend-board.controller';
import { NovelAttendBoardService } from './novel-attend-board.service';
import { NovelAttendBoardRepositryToken } from './repository/novel-attend-board.repository';
import { NovelAttendBoardRepositoryImpl } from './repository/novel-attend-board.repository.impl';
import { NovelRoomRepositoryProvider } from '@app/novel-room/repository/novel-room.repository';
import { BoardLikeEntity } from './entities/board-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NovelAttendBoardEntity, NovelRoomEntity, BoardLikeEntity])],
  controllers: [NovelAttendBoardController],
  providers: [
    NovelAttendBoardService,
    NovelRoomRepositoryProvider,
    {
      provide: NovelAttendBoardRepositryToken,
      useClass: NovelAttendBoardRepositoryImpl,
    },
  ],
  exports: [
    NovelAttendBoardService,
    {
      provide: NovelAttendBoardRepositryToken,
      useClass: NovelAttendBoardRepositoryImpl,
    },
  ],
})
export class NovelAttendBoardModule {}
