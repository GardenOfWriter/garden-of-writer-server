import { BaseException } from '@app/commons/exception/base.exception';
import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UserIncorrectEmailException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_EMAIL, HttpStatus.NOT_FOUND);
  }
}
