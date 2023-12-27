import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../commons/exception/base.exception';
import { NovelRoomErrorMessage } from './message/novel-room.message';

export class NovelRoomNotFoundException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.NOT_FOUND_NOVEL_ROOM, HttpStatus.NOT_FOUND);
  }
}
