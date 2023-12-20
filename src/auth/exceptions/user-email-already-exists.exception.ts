import { ConflictException } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UserEmailAlreadyExistsException extends ConflictException {
  constructor() {
    super(AuthExceptionMsg.USER_EMAIL_ALREADY_EXISTS);
  }
}
