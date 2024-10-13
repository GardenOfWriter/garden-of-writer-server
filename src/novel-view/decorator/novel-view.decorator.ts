import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { FindAllNovelViewResDto } from '../dto/response/find-all-novel-res.dto';

export function FindAllNovelView(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 리스트 출력',
    }),
    ApiExtraModels(FindAllNovelViewResDto),
    ApiCommonResponse(
      {
        $ref: getSchemaPath(FindAllNovelViewResDto),
      },
      { isArray: true },
    ),
  );
}

export function FindChapterByNovelRoomId(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 정보 및 회차 리스트 출력',
    }),
    ApiExtraModels(FindAllNovelViewResDto),
    ApiCommonResponse(
      {
        $ref: getSchemaPath(FindAllNovelViewResDto),
      },
      { isArray: true },
    ),
  );
}

export function FindTextByChapterId(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 리스트 출력',
    }),
  );
}

export function FindCommentByChapterId(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 댓글 리스트 출력',
    }),
    ApiCommonResponse(
      {
        $ref: getSchemaPath(String),
      },
      { isArray: true },
    ),
  );
}

export function SaveComment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 댓글 추가',
    }),
  );
}

export function DeleteComment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 댓글 삭제',
    }),
  );
}

export function SaveLike(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 좋아요 ',
    }),
  );
}

export function DeleteLike(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '회차 좋아요 해제',
    }),
  );
}
