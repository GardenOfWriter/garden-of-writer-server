import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from 'src/commons/decorator/swagger/swagger.exception';
import { CreateChapterRequestDto } from '../dto/request/create-chapter.dto';

export function CreateNovel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 연재 신청',
    }),
  );
}
