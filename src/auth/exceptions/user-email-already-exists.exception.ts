import { ConflictException, HttpStatus } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';
import { BaseException } from '@app/commons/exception/base.exception';

export class UserEmailAlreadyExistsException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.USER_EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
