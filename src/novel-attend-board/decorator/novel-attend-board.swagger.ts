import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { FindAllNovelAttendBoardDto } from '../dto/response/findall.dto';

export function FindNovelAttendBoard(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '작가 참여 게시글 조회',
    }),
    ApiExtraModels(FindAllNovelAttendBoardDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindAllNovelAttendBoardDto),
    }),
  );
}
export function CreateNovelAttendBoard(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '작가 참여 게시글 생성',
    }),
  );
}
