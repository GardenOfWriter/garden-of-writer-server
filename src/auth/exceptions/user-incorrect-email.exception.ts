import { UnauthorizedException } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UserIncorrectEmailException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_EMAIL);
  }
}
