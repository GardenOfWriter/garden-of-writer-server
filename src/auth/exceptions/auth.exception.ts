import { HttpStatus } from '@nestjs/common';
import { AuthExceptionMsg } from './message/auth.message';
import { BaseException } from '@app/commons/exception/base.exception';

export class TokenExpiredException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
  }
}
export class UnAuthorizedAccessException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}
export class UserEmailAlreadyExistsException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.USER_EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
export class UserIncorrectEmailException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_EMAIL, HttpStatus.NOT_FOUND);
  }
}
export class UserIncorrectPasswordException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_PASSWORD, HttpStatus.NOT_FOUND);
  }
}
export class UserNicknameAlreadyExistsException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.USER_NICKNAME_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
export class UserNotExistsException extends BaseException {
  constructor() {
    super(AuthExceptionMsg.USER_NOT_FOUNDED, HttpStatus.CONFLICT);
  }
}
