import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../commons/exception/base.exception';
import { NovelWriterExceptionMsg } from './message/novel-writer.message';

export class NotAccessWriterManagementExcetpion extends BaseException {
  constructor() {
    super(NovelWriterExceptionMsg.NOT_ACCESS_PARTICIATE_WRITER, HttpStatus.CONFLICT);
  }
}

export class BadChangeWriterIdSeqExcetpion extends BaseException {
  constructor() {
    super(NovelWriterExceptionMsg.BAD_CHANGE_WRITERID_SEQ, HttpStatus.BAD_REQUEST);
  }
}

export class AlreadyExistWriterExcetpion extends BaseException {
  constructor() {
    super(NovelWriterExceptionMsg.ALREADY_EXIST_WRITER, HttpStatus.CONFLICT);
  }
}
