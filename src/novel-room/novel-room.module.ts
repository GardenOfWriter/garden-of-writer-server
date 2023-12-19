import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { novelRoomType } from 'src/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { NovelRoomController } from 'src/novel-room/novel-room.controller';
import { NovelRoomService } from 'src/novel-room/novel-room.service';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([NovelRoomEntity, Repository<NovelRoomEntity>]),
  ],
  providers: [
    NovelRoomService,
    {
      provide: 'novelRoomType',
      useValue: novelRoomType,
    },
  ],
  controllers: [NovelRoomController],
  exports: ['novelRoomType', NovelRoomService],
})
export class NovelRoomModule {}
