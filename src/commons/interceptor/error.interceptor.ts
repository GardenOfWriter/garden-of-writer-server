import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseException } from '../exception/base.exception';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private logger = new Logger(ErrorsInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BaseException) {
          // NestJS 내장 HttpException 에러 처리
          console.log(error);
          // return throwError(() => new HttpException(error));
        } else if (error instanceof TypeORMError) {
          this.logger.error('query fail', JSON.stringify(error.message));
          return throwError(
            () =>
              new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        } else {
          this.logger.error(error);
          // 그 외 에러 처리 (예: 500 Internal Server Error)
          return throwError(
            () =>
              new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
      }),
    );
  }
}
