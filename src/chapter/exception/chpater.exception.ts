import { BaseException } from '@app/commons/exception/base.exception';
import { HttpStatus } from '@nestjs/common';
import { ChpaterExceptionMsg } from './message/chapter.message';

export class NotFoundChapterException extends BaseException {
  constructor() {
    super(ChpaterExceptionMsg.NOT_FOUND_CHAPTER, HttpStatus.NOT_FOUND);
  }
}
export class NotWritingChapterException extends BaseException {
  constructor() {
    super(ChpaterExceptionMsg.NOT_FOUND_CHAPTER, HttpStatus.NOT_FOUND);
  }
}
