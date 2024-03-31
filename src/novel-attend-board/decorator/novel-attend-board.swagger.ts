import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { FindAllNovelAttendBoardDto } from '../dto/response/findall.dto';
import { FindByIdLikeUserDto } from '../dto/response/findby-id-like-user.dto';

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

export function FindDetailBoard(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '작가 참여 게시글 상세정보',
    }),
    ApiExtraModels(FindByIdLikeUserDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindByIdLikeUserDto),
    }),
  );
}

export function CreateBoardLike(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '작가 참여 게시글 좋아요',
    }),
  );
}
