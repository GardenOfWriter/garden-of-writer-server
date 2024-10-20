import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class NovelRoomErrorMessage extends EnumType<NovelRoomErrorMessage>() {
  static readonly DUPLICATION_TITLE = new NovelRoomErrorMessage('4101', '중복된 소설공방 이름이 존재합니다.');
  static readonly DUPLICATION_SUBTITLE = new NovelRoomErrorMessage('4102', '중복된 한줄 소개가 존재합니다.');
  static readonly NOT_FOUND_NOVEL_ROOM = new NovelRoomErrorMessage('4102', '소설공방을 찾을수 없습니다.');
  static readonly ALREADY_COMPLETED = new NovelRoomErrorMessage('4103', '이미 완료된 소설공방입니다.');
  static readonly ACCESS_DENIED = new NovelRoomErrorMessage('4104', '소설공방 접근 권한이 없습니다.');

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
