import { FindByNovelRoomIdDto } from '@app/chapter/dto/request/findby-novel-room-id.dto';
import { ApiCommonResponse } from '@app/commons/decorator/swagger/common-response.decorator';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { FindByNovelRoomIdResponseDto } from '../dto/response/find-novel-room-id.dto';

export function ChangeWriterSeq(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '소설 공방에 참여한 작가 리스트',
      description: '소설 공방에 참여중인 상태의 작가 리스트 입니다.',
    }),
    ApiExtraModels(FindByNovelRoomIdResponseDto),
    ApiCommonResponse({
      $ref: getSchemaPath(FindByNovelRoomIdResponseDto),
    }),
  );
}
