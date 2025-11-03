import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { ApiProperty } from '@nestjs/swagger';
import { NovelRoomCategoryEnum, NovelRoomCategoryType } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomStatusEnum, NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { IsEnum } from 'class-validator';

export enum NovelRoomStatusReqEnum {
  SERIES = 'series',
  COMPLETE = 'complete',
  ALL = 'all',
}

export class FindByChapterIdCommentReqDto extends BasePaginationRequest {}

export class FindAllNovelViewReqDto extends BasePaginationRequest {
  @ApiProperty({
    example: `${NovelRoomCategoryEnum.ACTION_MARTIAL_ARTS}`,
    description: '일반소설 | 코믹',
  })
  @IsEnum(NovelRoomCategoryEnum, {
    message: 'category 는 1,2,3,4,5,6,7,8,9 에서 입력 가능합니다.',
  })
  readonly category: NovelRoomCategoryType;

  @ApiProperty({
    example: `${NovelRoomStatusReqEnum.SERIES}`,
    description: '연재중',
  })
  @IsEnum(NovelRoomStatusReqEnum, {
    message: 'status 는 series,complete,all 에서 입력 가능합니다.',
  })
  readonly status: NovelRoomStatusReqEnum;
}
