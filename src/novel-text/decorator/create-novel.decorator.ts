import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from 'src/commons/decorator/swagger/swagger.exception';
import { CreateNovelTextRequestDto } from '../dto/request/create-novel.dto';

export function CreateNovel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 작성 하기 API ',
    }),
    ApiOkResponse({ type: CreateNovelTextRequestDto }),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiResponse({ schema: {}, status: 2000 }),
  );
}
