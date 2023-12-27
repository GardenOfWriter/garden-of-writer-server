import { BaseException } from '@app/commons/exception/base.exception';
import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UnAuthorizedAccessException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}
