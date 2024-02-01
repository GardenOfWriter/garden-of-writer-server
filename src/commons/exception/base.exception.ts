import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ICommonResponse } from '../interceptor/response.interceptor';
import { CoreErrorMessage } from './core-error-message.interface';

export interface IBaseException extends ICommonResponse<null> {
  errorCode: string;
  path: string;
  validate?: string[];
}

export class BaseException
  extends HttpException
  implements IBaseException, CoreErrorMessage
{
  constructor(
    errorMessage: CoreErrorMessage,
    statusCode: number,
    validate?: string[],
  ) {
    super(errorMessage.errorCode, statusCode, {
      description: errorMessage.message,
    });
    this.errorCode = errorMessage.errorCode;
    this.message = errorMessage.message;
    this.statusCode = statusCode;
    this.validate = validate;
  }
  @ApiProperty()
  data: null;

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  validate: string[];
}
