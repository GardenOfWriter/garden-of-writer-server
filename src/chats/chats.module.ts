import { AuthModule } from '@app/auth/auth.module';
import { AuthService } from '@app/auth/auth.service';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { ChatsEntity } from '@app/chats/entities/chats.entity';
import { MessageEntity } from '@app/message/message.entity';
import { MessagesController } from '@app/message/messages.controller';
import { ChatsMessagesService } from '@app/message/messages.service';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsEntity, MessageEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [ChatsController, MessagesController],
  providers: [
    ChatsGateway,
    ChatsService,
    ChatsMessagesService,
    AuthService,
    JwtService,
  ],
})
export class ChatsModule {}
