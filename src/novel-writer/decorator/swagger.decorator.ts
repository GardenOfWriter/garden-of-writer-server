import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiParam, getSchemaPath } from '@nestjs/swagger';
import { FindByNovelWriterDetails } from '../dto/response/find-writers-details.dto';
import { FindNovelRoomResponseDto } from '../dto/response/find-novel-room-response.dto';

export function ChangeWriterSeq(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '작가 순서 변경',
      description: '작가 순서 변경 API 입니다.',
    }),
  );
}

export function FindWriter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방에 참여한 작가 리스트',
      description: '소설 공방에 참여중인 상태의 작가 리스트 입니다.',
    }),
    ApiExtraModels(FindNovelRoomResponseDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindNovelRoomResponseDto),
    }),
  );
}

export function FindWriterMangement(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방 작가 관리 메뉴 조회',
      description: '소설 공방 작가 관리 메뉴 조회 API 입니다. ',
    }),
    ApiExtraModels(FindByNovelWriterDetails),
    ApiCommonResponse({
      $ref: getSchemaPath(FindByNovelWriterDetails),
    }),
  );
}

export function ApplyNovelRoomWriter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방에 참여 작가로 참여 신청',
      description: '소설 공방에 참여한 작가로 참여 신청 API 입니다.',
    }),
  );
}

export function ChangeWriterSeqRequest(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '작가 순서 변경',
      description: '작가 순서 변경 API 입니다.',
    }),
  );
}

export function ExitWriter(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 참여 작가 퇴장 API',
      description: '소설 참여 작가 퇴장 API 입니다.',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '작가 ID',
    }),
  );
}

export function ChangeWriterStatus(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '참여 작가 상태 번경',
      description: '참여 작가 상태 번경 API 입니다.',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '작가 ID',
    }),
  );
}
