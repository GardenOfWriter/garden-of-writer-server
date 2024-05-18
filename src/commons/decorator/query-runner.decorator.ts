import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';

export const QueryRunner = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  if (!req.queryRunner) {
    throw new InternalServerErrorException('queryRunner 데코레이터 사용시 transDecorator를 적용해야합니다.');
  }
  return req.queryRunner;
});
