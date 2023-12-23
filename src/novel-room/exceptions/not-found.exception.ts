import { BaseEntity } from '@app/commons/entities/base.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NovelRoomErrorMessage } from './message/novel-room.message';
import { BaseException } from '../../commons/exception/base.exception';

export class NovelRoomNotFoundeException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.NOT_FOUND_NOVEL_ROOM, HttpStatus.NOT_FOUND);
  }
}
