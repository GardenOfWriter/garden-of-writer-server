import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class BoardErrorMessage extends EnumType<BoardErrorMessage>() {
  static readonly ALREAD_BOARD_LIKE = new BoardErrorMessage('4110', '이미 좋아요를 한 유저입니다.');
  static readonly NOT_FOUND_NOVEL_ATTEND_BOARD = new BoardErrorMessage('4111', '존재하지 않는 공방 입니다.');

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
