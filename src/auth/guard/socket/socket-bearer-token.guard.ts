import { AuthService } from '@app/auth/auth.service';
import { UserService } from '@app/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketBearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient();

    const headers = socket.handshake.headers;

    //Bearer xxxxxxx
    const rawToken = headers['authorization'];

    if (!rawToken) {
      throw new WsException('토큰이 없습니다!');
    }

    try {
      const token = this.authService.extractTokenFromHeader(rawToken, true);

      const payload = this.authService.verifyToken(token);

      const user = await this.userService.findEmail(payload.email);

      socket.user = user;
      socket.token = token;

      return true;
    } catch (error) {
      throw new WsException('토큰이 유효하지 않습니다.');
    }
  }
}
