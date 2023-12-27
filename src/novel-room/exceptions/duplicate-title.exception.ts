import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../commons/exception/base.exception';
import { NovelRoomErrorMessage } from './message/novel-room.message';

export class NovelRoomDuplicationTitleException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.DUPLICATION_TITLE, HttpStatus.CONFLICT);
  }
}
