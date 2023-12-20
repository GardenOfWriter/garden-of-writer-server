import { UnauthorizedException } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UserIncorrectPasswordException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_PASSWORD);
  }
}
