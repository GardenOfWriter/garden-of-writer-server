import { BaseException } from '@app/commons/exception/base.exception';
import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class TokenExpiredException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
  }
}
