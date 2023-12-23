import { BaseEntity } from '@app/commons/entities/base.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NovelRoomErrorMessage } from './message/novel-room.message';
import { BaseException } from '../../commons/exception/base.exception';

export class NovelRoomDuplicationTitleException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.DUPLICATION_TITLE, HttpStatus.CONFLICT);
  }
}
