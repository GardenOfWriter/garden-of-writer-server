import { CoreErrorMessage } from '@app/commons/exception/core-error-message.interface';
import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class AuthExceptionMsg extends EnumType<AuthExceptionMsg>() implements CoreErrorMessage {
  static readonly UNAUTHORIZED = new AuthExceptionMsg('4003', '허가되지 않는 접근입니다');
  static readonly TOKEN_EXPIRED = new AuthExceptionMsg('4004', '토큰이 만료되었습니다.');
  static readonly LOGIN_INPUT_INVALID_EMAIL = new AuthExceptionMsg('4005', '일치하는 이메일이 없습니다.');
  static readonly LOGIN_INPUT_INVALID_PASSWORD = new AuthExceptionMsg('4006', '비밀번호가 일치하지 않습니다.');
  static readonly USER_EMAIL_ALREADY_EXISTS = new AuthExceptionMsg('4007', '이미 존재하는 이메일입니다.');
  static readonly USER_NICKNAME_ALREADY_EXISTS = new AuthExceptionMsg('4009', '이미 존재하는 닉네임입니다.');
  static readonly USER_NOT_FOUNDED = new AuthExceptionMsg('4008', '해당 유저가 존재하지 않습니다.');

  private constructor(
    readonly _errorCode: string,
    readonly _message: string,
  ) {
    super();
  }
  get errorCode(): string {
    return this._errorCode;
  }

  get message(): string {
    return this._message;
  }
}
