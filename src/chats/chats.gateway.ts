import { AuthService } from '@app/auth/auth.service';
import { ChatsService } from '@app/chats/chats.service';
import { CreateChatDto } from '@app/chats/dto/create-chat.dto';
import { EnterChatDto } from '@app/chats/dto/enter-chat.dto';
import { SocketCatchHttpExceptionFilter } from '@app/commons/exception/socket-catch-http.exception-filter';
import { CreateMessagesDto } from '@app/message/dto/create-messages.dto';
import { ChatsMessagesService } from '@app/message/messages.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { SOCKET_EVENT_TYPE } from './enums/socket.event';
import { onlineList } from './onlineList';
import { isEmpty } from '@app/commons/util/data.helper';

@WebSocketGateway({
  namespace: /\/room-.+/,
  // cors: {
  //   origin: [
  //     'http://localhost:3000',
  //     'https://port-0-front-128y2k2llvlon7bn.sel5.cloudtype.app',
  //     'https://port-0-garden-of-writer-server-71t02clq3bpxzf.sel4.cloudtype.app',
  //   ],
  //   methods: ['GET', 'POST'],
  // },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger = new Logger(ChatsGateway.name);

  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: ChatsMessagesService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  private readonly roomNsp: { [key: string]: Namespace } = {};
  /**
   * 소켓 서버 초기화
   *
   * @param {Server} server 소켓 서버
   */
  afterInit(server: Server) {
    // instrument(server, {
    //   auth: false,
    //   mode: 'development',
    // });
    // this.io.to('room-1').emit('message', 'hello');
    this.logger.log('Socket Server Init Success');
  }

  /**
   * 소켓 연결종료 이벤트
   *
   * @param {Socket} socket
   */
  handleDisconnect(socket: Socket & { user: UserEntity } & { roomId: number }) {
    const roomId = socket.roomId;
    // if (isEmpty(onlineList[roomId])) {
    //   return;
    // }
    // onlineList[roomId] = onlineList[roomId].filter((id) => id !== socket.id);

    this.logger.log(`on disconnect called : ${socket.id}`);
  }

  /**
   * 소켓 연결 이벤트
   *
   * @async
   * @param {(Socket & { user: UserEntity })} socket 소켓 정보
   * @returns {Promise<boolean>}
   */
  async handleConnection(socket: Socket & { user: UserEntity } & { roomId: number }): Promise<boolean> {
    this.logger.log(`On connect called : ${socket.id}`);
    const roomNameSpace = socket.nsp;
    if (isEmpty(this.roomNsp[roomNameSpace.name])) {
      this.roomNsp[roomNameSpace.name] = roomNameSpace;
    }
    const roomId = roomNameSpace.name.split('-')[1];
    // const accessToken = socket.handshake.headers['auth'] as string;
    const accessToken = socket.handshake.auth.accessToken as string;

    this.logger.log(`Request AccessToken ${accessToken}`);
    // const accessToken = headers.find((header) => header.includes('accessToken')).split('=')[1];
    if (isEmpty(accessToken)) {
      this.logger.error(`Not Found Cookie accessToken : ${accessToken}`);
      socket.disconnect();
    }

    try {
      const payload = this.authService.verifyToken(accessToken);
      const user = await this.userService.findEmail(payload.email);

      // if (isEmpty(onlineList[roomId])) {
      //   onlineList[roomId] = [];
      // }
      // onlineList[roomId] = [...onlineList[roomId], socket.id];
      this.logger.log(`Connect user : ${JSON.stringify(user)}`);
      socket.user = user;
      socket.roomId = Number.parseInt(roomId);
      socket.join(roomNameSpace.name);
      // return true ?? 의미 파악 필요
      return true;
    } catch (error) {
      this.logger.error(`error on connection : ${error}`);
      socket.disconnect();
    }
  }

  /**
   * 공방 방 안에 있는 유저에게 이벤트 전달 (소켓)
   *
   * @param {number} novelRoomId 공방 ID
   * @param {string} emitEvent 이벤트 이름
   * @param {string} message 메시지
   */
  sendNovelRoomInMessage(novelRoomId: number, socketEvent: SOCKET_EVENT_TYPE, message: string): void {
    this.logger.debug(`room message ${JSON.stringify(novelRoomId)}`);
    if (isEmpty(this.roomNsp[`/room-${novelRoomId}`])) return;
    this.roomNsp[`/room-${novelRoomId}`].emit(socketEvent, message);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage('enterChat')
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
  async createChat(@MessageBody() data: CreateChatDto, @ConnectedSocket() socket: Socket & { user: UserEntity }) {
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
  async sendMessage(@MessageBody() dto: CreateMessagesDto, @ConnectedSocket() socket: Socket & { user: UserEntity }) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(`존재하는 않는 방입니다. Chat ID : ${dto.chatId}`);
    }

    const message = await this.messagesService.createMessage(dto, socket.user.id);

    this.server.in(message.chat.id.toString()).emit('receive_message', message.message);
  }
}
