import { NovelRoomTypeEnum } from '@app/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomController } from '@app/novel-room/novel-room.controller';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { NovelAttendBoardEntity } from '@app/novel-attend-board/entities/novel-attend-board.entity';
import { TagEntity } from '@app/novel-tag/entities/tag.entity';
import { NovelRoomRepositoryProvider } from './repository/novel-room.repository';
import { BoardLikeEntity } from '@app/novel-attend-board/entities/board-like.entity';
import { ChapterModule } from '@app/chapter/chapter.module';
import { NovelWriterModule } from '@app/novel-writer/novel-writer.module';
import { NovelAttendBoardModule } from '@app/novel-attend-board/novel-attend-board.module';
import { NovelTagModule } from '@app/novel-tag/novel-tags.module';
import { AbilityModule } from '@app/commons/abilities/ability.module';

@Module({
  imports: [
    ChapterModule,
    forwardRef(() => NovelWriterModule),
    NovelAttendBoardModule,
    NovelTagModule,
    AbilityModule,
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
  ],
  controllers: [NovelRoomController],
  exports: ['novelRoomTypeEnum', NovelRoomService, NovelRoomRepositoryProvider],
})
export class NovelRoomModule {}
