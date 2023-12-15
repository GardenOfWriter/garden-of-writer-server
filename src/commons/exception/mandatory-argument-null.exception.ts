import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from './error-message';

export class MandatoryArgumentNullException extends BadRequestException {
  constructor() {
    super(ErrorMessage.MANDATORY_ARGUMENT_IS_NULL);
  }
}
