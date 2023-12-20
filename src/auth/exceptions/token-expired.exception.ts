import { UnauthorizedException } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class TokenExpiredException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.TOKEN_EXPIRED);
  }
}
