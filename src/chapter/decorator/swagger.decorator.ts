import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { FindChapterRoomIdResDto } from '../dto/response/findbychapter-id.dto';
import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { UpdateChapterRequestDto } from '../dto/request/update-chapter.dto';
import { SwaggerExceptionDto } from '@app/commons/decorator/swagger/swagger.exception';

export function CreateChapter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '다음 회차 생성',
    }),
  );
}

export function FindChapter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설공방에 있는 회차 리스트 출력',
      description: '소설공방에 있는 회차 리스트 호출하는 API',
    }),
    ApiExtraModels(FindChapterRoomIdResDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindChapterRoomIdResDto),
    }),
  );
}

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
export function ChangeChapterTitle(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 제목 수정하기',
    }),
  );
}

export function ApplyChapter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 연재 승인 신청하기',
    }),
  );
}
