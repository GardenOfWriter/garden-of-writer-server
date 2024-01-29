import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function CreateNovel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 연재 신청',
    }),
  );
}
