import { BaseException } from '@app/commons/exception/base.exception';
import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UserIncorrectPasswordException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_PASSWORD, HttpStatus.NOT_FOUND);
  }
}
