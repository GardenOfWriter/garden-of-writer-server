import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([NovelWriterEntity, NovelRoomEntity])],
  controllers: [NovelWriterController, WriterManagementController],
  providers: [
    NovelWriterService,
    WriterManagementService,
    NovelRoomRepositoryProvider,
    NovelWriterRepositoryProvider,
    {
      provide: EmailServiceToken,
      useClass: EmailServiceImpl,
    },
  ],
  exports: [NovelWriterRepositoryProvider],
})
export class NovelWriterModule {}
