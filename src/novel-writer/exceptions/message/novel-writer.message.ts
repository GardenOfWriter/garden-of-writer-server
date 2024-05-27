import { CoreErrorMessage } from '@app/commons/exception/core-error-message.interface';
import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class NovelWriterExceptionMsg extends EnumType<NovelWriterExceptionMsg>() implements CoreErrorMessage {
  static readonly ALREADY_EXIST_WRITER = new NovelWriterExceptionMsg('4600', '이미 참여된 공방입니다.');
  static readonly NOT_ACCESS_PARTICIATE_WRITER = new NovelWriterExceptionMsg('4601', '해당 작가는 접근할수 없습니다.');
  static readonly BAD_CHANGE_WRITERID_SEQ = new NovelWriterExceptionMsg('4602', '소설 공방에 참여중이지 않는 writerId 값을 전달받았습니다.');
  static readonly NOT_EXIT_ROOM_SELF_REQUEST = new NovelWriterExceptionMsg('4603', '자기 자신을 퇴장 시킬수 없습니다.');

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
