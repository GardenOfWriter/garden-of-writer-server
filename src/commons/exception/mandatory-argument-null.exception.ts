import { BadRequestException } from '@nestjs/common';
import { ValidationErrorMessage } from './error-message';

export class MandatoryArgumentNullException extends BadRequestException {
  constructor() {
    super(ValidationErrorMessage.MANDATORY_ARGUMENT_IS_NULL);
  }
}
