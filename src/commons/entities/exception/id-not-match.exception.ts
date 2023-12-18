import { CoreErrorMessage } from './error-message/core-error-message.enum';
import { BadRequestException } from '@nestjs/common';

export class IdNotMatchException extends BadRequestException {
  constructor() {
    super(CoreErrorMessage.ID_NOT_MATCHED);
  }
}
