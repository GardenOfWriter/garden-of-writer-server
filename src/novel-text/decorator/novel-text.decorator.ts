import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { CreateNovelTextRequestDto } from '../dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from '../dto/request/update-novel.dto';
import { FindByChapterIdResponseDto } from '../dto/response/findbychapter-id.dto';
import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';

export function CreateNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 작성 하기',
    }),
  );
}

export function FindNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 조회 하기 ',
    }),
    ApiQuery({
      name: 'chapterId',
      required: true,
      type: Number,
      example: 1,
      description: '회차 ID',
    }),
    ApiExtraModels(FindByChapterIdResponseDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindByChapterIdResponseDto),
    }),
  );
}

export function UpdateNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 수정 하기 ',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '소설 글쓰기 ID (textId) websocket response로 받은 id로 사용',
    }),
    ApiOkResponse({ type: UpdateTextNovelRequestDto }),
  );
}

export function CompleteNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 완료 하기',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '소설 글쓰기 ID (textId) websocket response로 받은 id로 사용',
    }),
  );
}

export function DeleteNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 삭제 하기 (textId) websocket response로 받은 id로 사용 ',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '소설 글쓰기 ID (textId) websocket response로 받은 id로 사용',
    }),
  );
}
export function FindByIdNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '특정 소설 글쓰기 Id로 조회하기 (textId) websocket response로 받은 id로 사용',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '소설 글쓰기 ID (textId) websocket response로 받은 id로 사용',
    }),
    ApiOkResponse({ type: UpdateTextNovelRequestDto }),
  );
}
