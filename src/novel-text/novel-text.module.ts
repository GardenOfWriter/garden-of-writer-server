import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelTextEntity } from './entities/novel-text.entity';
import { NovelTextController } from './novel-text.controller';
import { NovelTextService } from './novel-text.service';
import { NovelTextRepository } from './repository/novel-text.repository';
import { NovelTextRepositoryImpl } from './repository/novel-text.repository.impl';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { ChatsModule } from '@app/chats/chats.module';
import { ChatsService } from '@app/chats/chats.service';
import { ChatsMessagesService } from '@app/message/messages.service';
import { AuthService } from '@app/auth/auth.service';
import { UserService } from '@app/user/user.service';
import { ChatsEntity } from '@app/chats/entities/chats.entity';
import { MessageEntity } from '@app/message/message.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@app/user/user.repository';
import { UserRepositoryProvider } from '@app/user/repository/user.repository';
import { UserEntity } from '@app/user/entities/user.entity';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { NovelRoomRepositoryProvider } from '@app/novel-room/repository/novel-room.repository';
import { NovelWriterRepositoryProvider } from '@app/novel-writer/repository/novel-writer.repository';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';

@Module({
  imports: [
    ChatsModule,
    TypeOrmModule.forFeature([
      NovelTextEntity,
      ChatsEntity,
      MessageEntity,
      UserEntity,
      NovelRoomEntity,
      NovelWriterEntity,
    ]),
  ],
  controllers: [NovelTextController],
  providers: [
    NovelTextService,
    {
      provide: NovelTextRepository,
      useClass: NovelTextRepositoryImpl,
    },
    ChatsGateway,
    ChatsService,
    ChatsMessagesService,
    AuthService,
    UserService,
    JwtService,
    UserRepositoryProvider,
    NovelRoomRepositoryProvider,
    NovelWriterRepositoryProvider,
  ],
})
export class NovelTextModule {}
