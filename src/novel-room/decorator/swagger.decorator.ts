import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { FindAttendStatusNovelRoomDto } from '../dto/response/find-attend-status.dto';
import { FindByRoomIdDetailDto } from '../dto/response/findbyid-detail.dto';

export function FindAllNovelRoom(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방 리스트 출력',
    }),
    ApiExtraModels(FindAttendStatusNovelRoomDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindAttendStatusNovelRoomDto),
    }),
  );
}

export function FindByDetailNovelRoom(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방 상세정보 출력',
    }),
    ApiExtraModels(FindByRoomIdDetailDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindByRoomIdDetailDto),
    }),
  );
}

export function CreateNovelRoom(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방 정보 생성',
    }),
  );
}

export function UpdateNovelRoom(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방 정보 수정',
    }),
  );
}

export function DeleteNovelRoom(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방 삭제(방장만 가능)',
    }),
  );
}
export function ComplateNovelRoom(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '공방 연재 완료',
    }),
  );
}
