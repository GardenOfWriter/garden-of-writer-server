import { BadRequestException, HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ErrorMessage } from './error-message';

export class ArgumentInvalidException extends BaseException {
  constructor() {
    super(
      ErrorMessage.ARGUMENT_INVALID.errorCode,
      ErrorMessage.ARGUMENT_INVALID.message,
      HttpStatus.BAD_REQUEST,
    );
  }
}
