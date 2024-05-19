import { CoreErrorMessage } from '@app/commons/exception/core-error-message.interface';
import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class ChpaterExceptionMsg extends EnumType<ChpaterExceptionMsg>() implements CoreErrorMessage {
  static readonly NOT_FOUND_CHAPTER = new ChpaterExceptionMsg('4033', '존재하지 않는 회차 입니다.');

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
