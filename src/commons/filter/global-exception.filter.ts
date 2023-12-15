import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { getToDayISO8601 } from '../util/date.util';
import { MsgResponse } from '../interceptor/response.interceptor';
import { Response } from 'express';

export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // TODO: 위 두개를 한꺼번에 합칠수 있는 방법은 없을까 ?
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'INTERNAL SERVER ERROR';
    const timestamp = getToDayISO8601();
    const responseBody: MsgResponse<null> = {
      statusCode,
      message,
      result: null,
      timestamp,
    };
    this.logger.error(`HTTP Error: ${statusCode} - Message: ${message}`);
    this.logger.error(`exception ${JSON.stringify(exception)}`);
    response.json(responseBody);
  }
}
