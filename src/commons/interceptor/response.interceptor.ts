import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { getToDayISO8601 } from '../util/date.util';

export interface MsgResponse<T> {
  statusCode: number;
  message: string;
  result: T | null;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, MsgResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<MsgResponse<T>> | Promise<Observable<MsgResponse<T>>> {
    return next.handle().pipe(
      map((result: T) => {
        const statusCode =
          context.switchToHttp().getResponse().statusCode || 200;
        const message = getSuccessResponseMessageForStatusCode(statusCode);
        const timestamp = getToDayISO8601();
        const successResponse: MsgResponse<T> = {
          statusCode,
          message,
          result: result || null,
          timestamp,
        };
        return successResponse;
      }),
    );
  }
}
function getSuccessResponseMessageForStatusCode(statusCode: number): string {
  switch (statusCode) {
    case HttpStatus.OK:
      return 'OK';
    case HttpStatus.CREATED:
      return 'CREATED';
    case HttpStatus.ACCEPTED:
      return 'ACCEPTED';
    case HttpStatus.NON_AUTHORITATIVE_INFORMATION:
      return 'NON_AUTHORITATIVE_INFORMATION';
    case HttpStatus.NO_CONTENT:
      return 'NO_CONTENT';
    case HttpStatus.RESET_CONTENT:
      return 'RESET_CONTENT';
    case HttpStatus.PARTIAL_CONTENT:
      return 'PARTIAL_CONTENT';
    default:
      return 'Unkown Status';
  }
}
