import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'cookie-parser';

export class SocketIoAdpater extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket, next) => {
      cookieParser()(socket.request, {}, next); // socket.request에 cookieParser 미들웨어 적용
    });
    return server;
  }
}
