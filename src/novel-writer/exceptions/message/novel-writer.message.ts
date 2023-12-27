import { CoreErrorMessage } from '@app/commons/exception/core-error-message.interface';
import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class NovelWriterExceptionMsg
  extends EnumType<NovelWriterExceptionMsg>()
  implements CoreErrorMessage
{
  static readonly ALREADY_EXIST_WRITER = new NovelWriterExceptionMsg(
    '4600',
    '이미 참여된 공방입니다.',
  );
  static readonly NOT_ACCESS_PARTICIATE_WRITER = new NovelWriterExceptionMsg(
    '4601',
    '참여 작가는 접근할수 없습니다.',
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
