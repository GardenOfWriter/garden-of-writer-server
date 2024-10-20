import { CoreErrorMessage } from '@app/commons/exception/core-error-message.interface';
import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class NovelTextExceptionMsg extends EnumType<NovelTextExceptionMsg>() implements CoreErrorMessage {
  static readonly NOT_CURRENTLY_WRITER = new NovelTextExceptionMsg('4301', '현재 작성자가 아닙니다.');
  static readonly NOT_FOUND_ROOM_WRITERS = new NovelTextExceptionMsg('4302', '공방안에 참가자가 없습니다.');
  static readonly NOT_FOUND_TEXT = new NovelTextExceptionMsg('4303', '글이 존재하지 않습니다.');

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
