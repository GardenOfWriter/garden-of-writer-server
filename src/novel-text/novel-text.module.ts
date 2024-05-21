import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelTextEntity } from './entities/novel-text.entity';
import { NovelTextController } from './novel-text.controller';
import { NovelTextService } from './novel-text.service';
import { NovelTextRepository } from './repository/novel-text.repository';
import { NovelTextRepositoryImpl } from './repository/novel-text.repository.impl';
import { ChatsModule } from '@app/chats/chats.module';
import { ChatsEntity } from '@app/chats/entities/chats.entity';
import { MessageEntity } from '@app/message/message.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { ChapterModule } from '@app/chapter/chapter.module';
import { NovelWriterModule } from '@app/novel-writer/novel-writer.module';

@Module({
  imports: [
    forwardRef(() => ChatsModule),
    ChapterModule,
    NovelWriterModule,
    TypeOrmModule.forFeature([NovelTextEntity, ChatsEntity, MessageEntity, UserEntity, NovelRoomEntity, NovelWriterEntity]),
  ],
  controllers: [NovelTextController],
  providers: [
    NovelTextService,
    {
      provide: NovelTextRepository,
      useClass: NovelTextRepositoryImpl,
    },
  ],
  exports: [
    NovelTextService,
    {
      provide: NovelTextRepository,
      useClass: NovelTextRepositoryImpl,
    },
  ],
})
export class NovelTextModule {}
