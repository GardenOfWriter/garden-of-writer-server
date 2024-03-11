import { HttpStatus } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';
import { BaseException } from '@app/commons/exception/base.exception';

export class UserNotExistsException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.USER_NOT_FOUNDED, HttpStatus.CONFLICT);
  }
}
