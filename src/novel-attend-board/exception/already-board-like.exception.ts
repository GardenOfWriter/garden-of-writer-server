import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../commons/exception/base.exception';
import { BoardErrorMessage } from './message/board.message';

export class AlreadBoardLikeException extends BaseException {
  constructor() {
    super(BoardErrorMessage.ALREAD_BOARD_LIKE, HttpStatus.CONFLICT);
  }
}
