import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { NovelWriterController } from './novel-writer.controller';
import { NovelWriterService } from './novel-writer.service';
import { NovelWriterRepositoryToken } from './repository/novel-writer.repository';
import { NovelWriterRepositoryImpl } from './repository/novel-writer.repository.impl';
import { WriterManagementController } from './writer-management.controller';
import { EmailServiceToken } from '@app/commons/email/email.service';
import { EmailServiceImpl } from '@app/commons/email/email.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([NovelWriterEntity])],
  controllers: [NovelWriterController, WriterManagementController],
  providers: [
    NovelWriterService,
    {
      provide: NovelWriterRepositoryToken,
      useClass: NovelWriterRepositoryImpl,
    },
    {
      provide: EmailServiceToken,
      useClass: EmailServiceImpl,
    },
  ],
})
export class NovelWriterModule {}
