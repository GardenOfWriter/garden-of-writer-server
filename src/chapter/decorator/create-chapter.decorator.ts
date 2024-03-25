import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function CreateChapter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 연재 신청',
    }),
  );
}
