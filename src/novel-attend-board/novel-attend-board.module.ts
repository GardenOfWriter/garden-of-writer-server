import { Module } from '@nestjs/common';
import { NovelAttendBoardController } from './novel-attend-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelAttendBoardEntity } from './entities/novel-attend-board.entity';
import { NovelAttendBoardRepositryToken } from './repository/novel-attend-board.repository';
import { NovelAttendBoardRepositoryImpl } from './repository/novel-attend-board.repository.impl';
import { NovelAttendBoardService } from './novel-attend-board.service';
import { NovelRoomEntity } from '../novel-room/entities/novel-room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NovelAttendBoardEntity, NovelRoomEntity]),
  ],
  controllers: [NovelAttendBoardController],
  providers: [
    NovelAttendBoardService,
    {
      provide: NovelAttendBoardRepositryToken,
      useClass: NovelAttendBoardRepositoryImpl,
    },
  ],
})
export class NovelAttendBoardModule {}
