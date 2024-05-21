import { NovelRoomTypeEnum } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomController } from '@app/novel-room/novel-room.controller';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterRepositoryProvider } from '@app/chapter/repository/chapter.repository';
import { AbilityFactory } from '@app/commons/abilities/ability.factory';
import { ActionsFactory } from '@app/commons/abilities/action.factory';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';
import { NovelWriterRepositoryProvider } from '@app/novel-writer/repository/novel-writer.repository';
import { UserEntity } from '@app/user/entities/user.entity';
import { NovelAttendBoardEntity } from '@app/novel-attend-board/entities/novel-attend-board.entity';
import { NovelAttendBoardRepositoryProvider } from '@app/novel-attend-board/repository/novel-attend-board.repository';
import { NovelAttendBoardService } from '@app/novel-attend-board/novel-attend-board.service';
import { TagEntity } from '@app/novel-tag/entities/tag.entity';
import { NovelTagService } from '../novel-tag/novel-tag.service';
import { NovelRoomRepositoryProvider } from './repository/novel-room.repository';
import { BoardLikeEntity } from '@app/novel-attend-board/entities/board-like.entity';
import { ChapterModule } from '@app/chapter/chapter.module';
import { NovelWriterModule } from '@app/novel-writer/novel-writer.module';
import { NovelAttendBoardModule } from '@app/novel-attend-board/novel-attend-board.module';
import { NovelTagModule } from '@app/novel-tag/novel-tags.module';

@Module({
  imports: [
    ChapterModule,
    forwardRef(() => NovelWriterModule),
    // NovelAttendBoardModule,
    NovelTagModule,
    TypeOrmModule.forFeature([
      NovelRoomEntity,
      NovelAttendBoardEntity, //
      UserEntity,
      NovelWriterEntity,
      ChapterEntity,
      NovelTagEntity,
      TagEntity,
      BoardLikeEntity,
    ]),
  ],
  providers: [
    // AbilityFactory,
    NovelRoomService,
    {
      provide: 'novelRoomTypeEnum',
      useValue: NovelRoomTypeEnum,
    },
    NovelRoomRepositoryProvider,
    // ActionsFactory,
  ],
  // controllers: [NovelRoomController],
  exports: ['novelRoomTypeEnum', NovelRoomService, NovelRoomRepositoryProvider],
})
export class NovelRoomModule {}
