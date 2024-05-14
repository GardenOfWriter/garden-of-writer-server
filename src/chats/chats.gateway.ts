import { AuthService } from '@app/auth/auth.service';
import { ChatsService } from '@app/chats/chats.service';
import { CreateChatDto } from '@app/chats/dto/create-chat.dto';
import { EnterChatDto } from '@app/chats/dto/enter-chat.dto';
import { SocketCatchHttpExceptionFilter } from '@app/commons/exception/socket-catch-http.exception-filter';
import { CreateMessagesDto } from '@app/message/dto/create-messages.dto';
import { ChatsMessagesService } from '@app/message/messages.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: ChatsMessagesService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(socket: Socket) {
    console.log(`on disconnect called : ${socket.id}`);
  }

  async handleConnection(socket: Socket & { user: UserEntity }) {
    console.log(`on connect called : ${socket.id}`);

    const headers = socket.handshake.headers;

    //Bearer xxxxxxx
    const rawToken = headers['authorization'];

    if (!rawToken) {
      socket.disconnect();
    }

    try {
      const token = this.authService.extractTokenFromHeader(rawToken, true);

      const payload = this.authService.verifyToken(token);

      const user = await this.userService.findEmail(payload.email);

      socket.user = user;

      return true;
    } catch (error) {
      socket.disconnect();
    }
  }
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage('enter_chat')
  async enterChat(
    //방의 ID들을 리스트로 받는다.
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket & { user: UserEntity },
  ) {
    for (const chatId of data.chatIds) {
      const exists = await this.chatsService.checkIfChatExists(chatId);

      if (!exists) {
        throw new WsException({
          code: 100,
          message: `존재하지 않는 방입니다. chatId: ${chatId}`,
        });
      }
    }

    socket.join(data.chatIds.map((x) => x.toString()));
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket & { user: UserEntity },
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody() dto: CreateMessagesDto,
    @ConnectedSocket() socket: Socket & { user: UserEntity },
  ) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(`존재하는 않는 방입니다. Chat ID : ${dto.chatId}`);
    }

    const message = await this.messagesService.createMessage(
      dto,
      socket.user.id,
    );

    this.server
      .in(message.chat.id.toString())
      .emit('receive_message', message.message);
  }
}
