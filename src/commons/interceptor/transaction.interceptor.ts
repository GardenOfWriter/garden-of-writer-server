import { DataSource } from 'typeorm';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, tap } from 'rxjs';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest();
    const qr = await this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    req.queryRunner = qr;
    return next.handle().pipe(
      catchError(async (e) => {
        await qr.rollbackTransaction();
        throw e;
      }),
      tap(async () => {
        await qr.commitTransaction();
        await qr.release();
      }),
    );
  }
}
