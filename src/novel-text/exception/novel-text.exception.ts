import { BaseException } from '@app/commons/exception/base.exception';
import { NovelTextExceptionMsg } from './message/message';
import { HttpStatus } from '@nestjs/common';

export class NotCurrentlyWriterException extends BaseException {
  constructor() {
    super(NovelTextExceptionMsg.NOT_CURRENTLY_WRITER, HttpStatus.NOT_FOUND);
  }
}
