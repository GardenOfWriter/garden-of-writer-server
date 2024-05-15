import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../commons/exception/base.exception';
import { NovelWriterExceptionMsg } from './message/novel-writer.message';

export class NotAccessWriterManagementExcetpion extends BaseException {
  constructor() {
    super(
      NovelWriterExceptionMsg.NOT_ACCESS_PARTICIATE_WRITER,
      HttpStatus.CONFLICT,
    );
  }
}
