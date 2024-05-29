import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindByChapterIdNovelTextDto extends BasePaginationRequest {
  @ApiProperty({
    example: 16,
    description: '회차 ID',
  })
  @IsNumber()
  chapterId: number;
}
