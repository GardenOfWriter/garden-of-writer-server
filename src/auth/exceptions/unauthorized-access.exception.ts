import { UnauthorizedException } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';

export class UnAuthorizedAccessException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.UNAUTHORIZED);
  }
}
