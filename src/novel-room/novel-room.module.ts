import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { novelRoomTypeEnum } from 'src/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import { NovelRoomController } from 'src/novel-room/novel-room.controller';
import { NovelRoomService } from 'src/novel-room/novel-room.service';
import { userEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterRepositoryToken } from '@app/chapter/repository/chapter.repository';
import { ChapterRepositoryImpl } from '@app/chapter/repository/chapter.repository.impl';
import { AbilityFactory } from '@app/commons/abilities/ability.factory';
import { NovelWriterRepositoryToken } from '@app/novel-writer/repository/novel-writer.repository';
import { NovelWriterRepositoryImpl } from '@app/novel-writer/repository/novel-writer.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NovelRoomEntity, //
      Repository<NovelRoomEntity>,
      userEntity,
      NovelWriterEntity,
      ChapterEntity,
    ]),
  ],
  providers: [
    AbilityFactory,
    NovelRoomService,
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
      useValue: novelRoomTypeEnum,
    },
  ],
  controllers: [NovelRoomController],
  exports: ['novelRoomTypeEnum', NovelRoomService],
})
export class NovelRoomModule {}
