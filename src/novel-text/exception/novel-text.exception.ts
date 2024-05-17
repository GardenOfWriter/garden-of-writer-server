import { BaseException } from '@app/commons/exception/base.exception';
import { NovelTextExceptionMsg } from './message/message';
import { HttpStatus } from '@nestjs/common';

export class NotCurrentlyWriterException extends BaseException {
  constructor() {
    super(NovelTextExceptionMsg.NOT_CURRENTLY_WRITER, HttpStatus.NOT_FOUND);
  }
}

export class NotFoundRoomWriters extends BaseException {
  constructor() {
    super(NovelTextExceptionMsg.NOT_FOUND_ROOM_WRITERS, HttpStatus.NOT_FOUND);
  }
}
