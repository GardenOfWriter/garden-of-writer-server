import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../commons/exception/base.exception';
import { NovelWriterExceptionMsg } from './message/novel-writer.message';

export class AlreadyExistWriterExcetpion extends BaseException {
  constructor() {
    super(NovelWriterExceptionMsg.ALREADY_EXIST_WRITER, HttpStatus.CONFLICT);
  }
}
