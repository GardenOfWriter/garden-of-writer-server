import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ValidationErrorMessage } from './error-message';

export class ArgumentInvalidException extends BaseException {
  constructor(error: any) {
    super(ValidationErrorMessage.ARGUMENT_INVALID, HttpStatus.BAD_REQUEST, error);
  }
}
