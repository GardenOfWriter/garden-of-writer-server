import { ConflictException } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UserNotExistsException extends ConflictException {
  constructor() {
    super(AuthExceptionMsg.USER_NOT_FOUNDED);
  }
}
