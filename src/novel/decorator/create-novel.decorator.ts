import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from 'src/commons/decorator/swagger/swagger.exception';
import { UpdateNovelRequestDto } from '../dto/request/update-novel.dto';

export function CreateNovel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 작성 하기 API ',
    }),
    ApiOkResponse({ type: UpdateNovelRequestDto }),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiResponse({ schema: {}, status: 2000 }),
  );
}
