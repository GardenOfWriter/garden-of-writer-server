import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { NovelWriterController } from './novel-writer.controller';
import { NovelWriterService } from './novel-writer.service';
import { NovelWriterRepositoryProvider } from './repository/novel-writer.repository';
import { WriterManagementController } from './writer-management.controller';
import { EmailServiceToken } from '@app/commons/email/email.service';
import { EmailServiceImpl } from '@app/commons/email/email.service.impl';
import { WriterManagementService } from './writer-management.service';
import { NovelRoomRepositoryProvider } from '@app/novel-room/repository/novel-room.repository';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { ChatsModule } from '@app/chats/chats.module';
import { NovelTagService } from '@app/novel-tag/novel-tag.service';
import { NovelRoomModule } from '@app/novel-room/novel-room.module';
import { WriterSeqHelper } from './helper/writer-seq.helper';

@Module({
  imports: [forwardRef(() => NovelRoomModule), ChatsModule, TypeOrmModule.forFeature([NovelWriterEntity, NovelRoomEntity])],
  controllers: [NovelWriterController, WriterManagementController],
  providers: [
    NovelWriterService,
    WriterManagementService,
    NovelWriterRepositoryProvider,
    WriterSeqHelper,
    {
      provide: EmailServiceToken,
      useClass: EmailServiceImpl,
    },
  ],
  exports: [NovelWriterRepositoryProvider, NovelWriterService, WriterSeqHelper],
})
export class NovelWriterModule {}
