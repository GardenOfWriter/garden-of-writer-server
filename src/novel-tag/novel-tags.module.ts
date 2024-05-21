import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterRepositoryProvider, ChapterRepositoryToken } from '@app/chapter/repository/chapter.repository';
import { ChapterRepositoryImpl } from '@app/chapter/repository/chapter.repository.impl';
import { EmailServiceProvider, EmailServiceToken } from '@app/commons/email/email.service';
import { EmailServiceImpl } from '@app/commons/email/email.service.impl';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { NovelWriterRepositoryProvider, NovelWriterRepositoryToken } from '@app/novel-writer/repository/novel-writer.repository';
import { NovelWriterRepositoryImpl } from '@app/novel-writer/repository/novel-writer.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { NovelTagService } from '@app/novel-tag/novel-tag.service';
import { NovelRoomRepositoryProvider } from '@app/novel-room/repository/novel-room.repository';
import { NovelRoomModule } from '@app/novel-room/novel-room.module';

@Module({
  imports: [
    forwardRef(() => NovelRoomModule),
    TypeOrmModule.forFeature([
      UserEntity,
      NovelTagEntity, //
      NovelRoomEntity,
      NovelWriterEntity,
      ChapterEntity,
      TagEntity,
    ]),
  ],
  providers: [NovelTagService, EmailServiceProvider],
  exports: [NovelTagService],
})
export class NovelTagModule {}
