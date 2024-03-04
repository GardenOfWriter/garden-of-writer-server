import { NovelRoomTypeEnum } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomController } from '@app/novel-room/novel-room.controller';
import { NovelRoomService } from '@app/novel-tag/novel-room.service';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterRepositoryToken } from '@app/chapter/repository/chapter.repository';
import { ChapterRepositoryImpl } from '@app/chapter/repository/chapter.repository.impl';
import { AbilityFactory } from '@app/commons/abilities/ability.factory';
import { ActionsFactory } from '@app/commons/abilities/action.factory';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';
import { NovelWriterRepositoryToken } from '@app/novel-writer/repository/novel-writer.repository';
import { NovelWriterRepositoryImpl } from '@app/novel-writer/repository/novel-writer.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';
import { NovelAttendBoardEntity } from '@app/novel-attend-board/entities/novel-attend-board.entity';
import { NovelAttendBoardRepositryToken } from '@app/novel-attend-board/repository/novel-attend-board.repository';
import { NovelAttendBoardRepositoryImpl } from '@app/novel-attend-board/repository/novel-attend-board.repository.impl';
import { NovelAttendBoardService } from '@app/novel-attend-board/novel-attend-board.service';
import { TagEntity } from '@app/novel-tag/entities/tag.entity';
import { NovelTagService } from './novel-tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NovelRoomEntity,
      NovelAttendBoardEntity, //
      Repository<NovelRoomEntity>,
      UserEntity,
      NovelWriterEntity,
      ChapterEntity,
      NovelTagEntity,
      TagEntity,
    ]),
  ],
  providers: [
    AbilityFactory,
    NovelRoomService,
    NovelTagService,
    NovelAttendBoardService,
    {
      provide: NovelWriterRepositoryToken,
      useClass: NovelWriterRepositoryImpl,
    },
    {
      provide: ChapterRepositoryToken,
      useClass: ChapterRepositoryImpl,
    },
    {
      provide: 'novelRoomTypeEnum',
      useValue: NovelRoomTypeEnum,
    },
    {
      provide: NovelAttendBoardRepositryToken,
      useClass: NovelAttendBoardRepositoryImpl,
    },
    ActionsFactory,
  ],
  controllers: [NovelRoomController],
  exports: ['novelRoomTypeEnum', NovelRoomService],
})
export class NovelRoomModule {}
