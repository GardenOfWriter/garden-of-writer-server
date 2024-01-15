import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { ValidationErrorMessage } from './error-message';
import { BaseException } from './base.exception';

export class ArgumentInvalidException extends BaseException {
  constructor(error: any) {
    super(
      ValidationErrorMessage.ARGUMENT_INVALID,
      HttpStatus.BAD_REQUEST,
      error,
    );
  }
}
