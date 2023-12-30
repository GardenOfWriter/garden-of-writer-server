import { ValidationError } from '@nestjs/common';
import { Enum, EnumType } from 'ts-jenum';
import { CoreErrorMessage } from './core-error-message.interface';

@Enum('message')
export class ValidationErrorMessage
  extends EnumType<ValidationErrorMessage>()
  implements CoreErrorMessage
{
  static readonly ARGUMENT_INVALID = new ValidationErrorMessage(
    '4001',
    '잘못된 파라미터 입니다.',
  );
  static readonly MANDATORY_ARGUMENT_IS_NULL = new ValidationErrorMessage(
    '4002',
    '필수 파라미터가 없습니다.',
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
