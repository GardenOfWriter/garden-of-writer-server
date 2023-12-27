import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from 'src/commons/decorator/swagger/swagger.exception';
import { UpdateChapterRequestDto } from '../dto/request/update-chapter.dto';

export function CreateNovel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 상태 수정 API',
    }),
    ApiOkResponse({ type: UpdateChapterRequestDto }),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiResponse({ schema: {}, status: 2000 }),
  );
}
