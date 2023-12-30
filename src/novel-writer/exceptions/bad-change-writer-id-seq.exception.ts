import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../commons/exception/base.exception';
import { NovelWriterExceptionMsg } from './message/novel-writer.message';

export class BadChangeWriterIdSeqExcetpion extends BaseException {
  constructor() {
    super(
      NovelWriterExceptionMsg.BAD_CHANGE_WRITERID_SEQ,
      HttpStatus.BAD_REQUEST,
    );
  }
}
