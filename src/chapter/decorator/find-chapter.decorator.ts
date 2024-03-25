import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { FindChapterRoomIdResDto } from '../dto/response/findbychapter-id.dto';

export function FindChapter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설공방에 있는 회차 리스트 출력',
      description: '소설공방에 있는 회차 리스트 호출하는 API 입니다.',
    }),
    ApiExtraModels(FindChapterRoomIdResDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindChapterRoomIdResDto),
    }),
  );
}
