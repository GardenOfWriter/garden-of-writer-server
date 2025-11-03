import { AuthService } from '@app/auth/auth.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { SOCKET_EVENT_TYPE } from './enums/socket.event';
import { isEmpty } from '@app/commons/util/data.helper';

@WebSocketGateway({
  namespace: /\/room-.+/,
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger = new Logger(ChatsGateway.name);

  constructor(
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
    const accessToken = socket.handshake.auth.accessToken as string;
    // const accessToken = socket.handshake.auth.accessToken as string;

    this.logger.log(`Request AccessToken ${accessToken}`);
    // const accessToken = headers.find((header) => header.includes('accessToken')).split('=')[1];
    if (isEmpty(accessToken)) {
      this.logger.error(`Not Found Cookie accessToken : ${accessToken}`);
      socket.disconnect();
    }

    try {
      const payload = this.authService.verifyToken(accessToken);
      const user = await this.userService.findEmail(payload.email);

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
    // console.log('sockets ', this.roomNsp[`/room-${novelRoomId}`].sockets);
    if (isEmpty(this.roomNsp[`/room-${novelRoomId}`])) return;
    this.roomNsp[`/room-${novelRoomId}`].emit(socketEvent, message);
  }
}
