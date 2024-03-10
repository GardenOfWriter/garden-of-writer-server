import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { getToDayISO8601 } from '../util/date.util';
import { Request } from 'express';

export interface ICommonResponse<T> {
  statusCode: number;
  message: string;
  data: T | null;
  timestamp: string;
  meta?: any;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ICommonResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ICommonResponse<T>> | Promise<Observable<ICommonResponse<T>>> {
    return next.handle().pipe(
      map((result: any) => {
        const req = context.switchToHttp().getRequest() as Request;
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const method = req.method;
        const customStatusCode = this.getSuccessCustomsCode(method, result);
        const message = getSuccessResponseMessageForStatusCode(statusCode);
        const timestamp = getToDayISO8601();
        let meta = undefined;
        if (result?.meta) {
          const { items, meta: resMeta } = result;
          result = items;
          meta = resMeta;
        }
        const successResponse: ICommonResponse<T> = {
          statusCode: customStatusCode,
          message,
          data: result || null,
          timestamp,
          meta: meta || undefined,
        };
        return successResponse;
      }),
    );
  }
  getSuccessCustomsCode(method, result) {
    // 응답 데이터가 있을경우 200
    if (result) {
      return HttpStatus.OK; // 200
    }
    // 응답 데이터가 없을경우
    switch (method) {
      case 'GET':
        return HttpStatus.OK; // 200
      case 'POST':
        return HttpStatus.CREATED; // 201
      case 'PUT':
        return HttpStatus.OK; // 200
      case 'DELETE':
        return HttpStatus.NO_CONTENT; // 204
    }
  }
}

function getSuccessResponseMessageForStatusCode(
  statusCode: HttpStatus,
): string {
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
