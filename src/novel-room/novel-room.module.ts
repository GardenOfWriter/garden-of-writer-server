import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { novelRoomType } from 'src/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { NovelRoomController } from 'src/novel-room/novel-room.controller';
import { NovelRoomService } from 'src/novel-room/novel-room.service';
import { userEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';

import { NovelWriterRepositoryImpl } from '@app/novel-writer/repository/novel-writer.repository.impl';
import { NovelWriterRepository } from '@app/novel-writer/repository/novel-writer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NovelRoomEntity, //
      Repository<NovelRoomEntity>,
      userEntity,
      NovelWriterEntity,
    ]),
  ],
  providers: [
    NovelRoomService,
    {
      provide: NovelWriterRepository,
      useClass: NovelWriterRepositoryImpl,
    },
    {
      provide: 'novelRoomType',
      useValue: novelRoomType,
    },
  ],
  controllers: [NovelRoomController],
  exports: ['novelRoomType', NovelRoomService],
})
export class NovelRoomModule {}
