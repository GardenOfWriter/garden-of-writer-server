import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { getToDayISO8601 } from '../util/date.util';
import { Request, Response } from 'express';

export interface ICommonResponse<T> {
  data: T | null;
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
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;
        const method = req.method;
        const customStatusCode = this.getSuccessCustomsCode(method, result);
        let meta = undefined;
        res.status(customStatusCode);
        if (result?.meta) {
          const { items, meta: resMeta } = result;
          result = items;
          meta = resMeta;
        }
        const successResponse: ICommonResponse<T> = {
          data: result || null,
          meta: meta || undefined,
        };

        console.log('successResponse', successResponse);
        return successResponse;
      }),
    );
  }
  /**
   * 성공시 응답 코드 반환
   * NO_CONTENT : 204 (return 이 안옴  프론드 담당자와 협의)
   */
  getSuccessCustomsCode(method, result) {
    // 응답 데이터가 있을경우 200
    if (result) {
      return HttpStatus.OK; // 200
    }
    // 응답 데이터가 없을경우
    switch (method) {
      case 'GET':
        return HttpStatus.NO_CONTENT; // 204
      case 'POST':
        return HttpStatus.CREATED; // 201
      case 'PUT':
        return HttpStatus.NO_CONTENT; // 204
      case 'PATCH':
        return HttpStatus.NO_CONTENT; // 204
      case 'DELETE':
        return HttpStatus.NO_CONTENT; // 204
    }
  }
}
