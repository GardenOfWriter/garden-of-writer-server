import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { EmailServiceProvider } from '@app/commons/email/email.service';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelTagEntity } from '@app/novel-tag/entities/novel-tag.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { NovelTagService } from '@app/novel-tag/novel-tag.service';
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
