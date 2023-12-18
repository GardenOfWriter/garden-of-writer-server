import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ICommonResponse } from '../interceptor/response.interceptor';

export interface IBaseException extends ICommonResponse<null> {
  errorCode: string;
  path: string;
}

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, message: string, statusCode: number) {
    super(errorCode, statusCode, { description: message });
    this.errorCode = errorCode;
    this.message = message;
    this.statusCode = statusCode;
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
}
