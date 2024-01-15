import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { getToDayISO8601 } from '../util/date.util';
import { Request, Response } from 'express';
import { IBaseException } from '../exception/base.exception';

export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
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
    // const data = exception instanceof HttpException ? exception.data : null;
    console.log('exception = ', exception?.data);
    response.status(statusCode);

    const responseBody: IBaseException = {
      errorCode:
        exception?.response || 'Unknow Error Contact System Adminstrator',
      path: request.path,
      statusCode,
      message,
      data: null,
      validate: exception?.validate,
      timestamp: getToDayISO8601(),
    };
    this.logger.error(`HTTP Error: ${statusCode} - Message: ${message}`);
    this.logger.error(`exception ${JSON.stringify(exception)}`);
    response.json(responseBody);
  }
}
