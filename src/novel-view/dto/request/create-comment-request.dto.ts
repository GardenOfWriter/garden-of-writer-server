import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { NovelRoomCategoryEnum, NovelRoomCategoryType } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomStatusEnum, NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum NovelRoomStatusReqEnum {
  SERIES = 'series',
  COMPLETE = 'complete',
  ALL = 'all',
}

export class CreateChapterCommentRequestDto {
  @ApiProperty({
    example: `댓글입니다.`,
    description: '회차 댓글',
  })
  @IsString()
  readonly comment: string;
}
