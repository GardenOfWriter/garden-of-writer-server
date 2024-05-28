import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateNovelTextRequestDto } from '../dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from '../dto/request/update-novel.dto';

export function CreateNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 작성 하기',
    }),
    ApiOkResponse({ type: CreateNovelTextRequestDto }),
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
      description: '소설 글쓰기 ID',
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
      description: '소설 글쓰기 ID',
    }),
    ApiOkResponse({ type: UpdateTextNovelRequestDto }),
  );
}

export function DeleteNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 글쓰기 삭제 하기 ',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '소설 글쓰기 ID',
    }),
  );
}
export function FindByIdNovelText(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '특정 소설 글쓰기 Id로 조회하기',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      example: 1,
      description: '소설 글쓰기 ID',
    }),
    ApiOkResponse({ type: UpdateTextNovelRequestDto }),
  );
}
