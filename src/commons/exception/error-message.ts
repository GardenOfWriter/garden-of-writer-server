import { Enum, EnumType } from 'ts-jenum';
import { CoreErrorMessage } from './core-error-message.interface';

@Enum('message')
export class ErrorMessage
  extends EnumType<ErrorMessage>()
  implements CoreErrorMessage
{
  static readonly ARGUMENT_INVALID = new ErrorMessage(
    '4001',
    '잘못된 파라미터 입니다.',
  );
  static readonly MANDATORY_ARGUMENT_IS_NULL = new ErrorMessage(
    '4002',
    '필수 파라미터가 없습니다.',
  );
  static readonly UNAUTHORIZED = new ErrorMessage(
    '4010',
    '허가되지 않는 접근입니다',
  );
  static readonly TOKEN_EXPIRED = new ErrorMessage(
    '4011',
    '토큰이 만료되었습니다.',
  );

  static readonly LOGIN_INPUT_INVALID_EMAIL = new ErrorMessage(
    '4012',
    '일치하는 이메일이 없습니다.',
  );
  static readonly LOGIN_INPUT_INVALID_PASSWORD = new ErrorMessage(
    '4013',
    '비밀번호가 일치하지 않습니다.',
  );

  static readonly USER_EMAIL_ALREADY_EXISTS = new ErrorMessage(
    '4014',
    '이미 존재하는 이메일입니다.',
  );
  static readonly USER_NOT_FOUNDED = new ErrorMessage(
    '4015',
    '해당 유저가 존재하지 않습니다.',
  );

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
