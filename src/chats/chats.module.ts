import { AuthModule } from '@app/auth/auth.module';
import { AuthService } from '@app/auth/auth.service';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { ChatsEntity } from '@app/chats/entities/chats.entity';
import { MessageEntity } from '@app/message/message.entity';
import { MessagesController } from '@app/message/messages.controller';
import { ChatsMessagesService } from '@app/message/messages.service';
import { UserModule } from '@app/user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { NovelRoomModule } from '@app/novel-room/novel-room.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => NovelRoomModule), UserModule, TypeOrmModule.forFeature([ChatsEntity, MessageEntity])],
  controllers: [ChatsController, MessagesController],
  providers: [ChatsGateway, ChatsService, ChatsMessagesService],
  exports: [ChatsGateway, ChatsService, ChatsMessagesService],
})
export class ChatsModule {}
