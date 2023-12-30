import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindByNovelRoomIdDto extends BasePaginationRequest {
  @ApiProperty({
    example: 16,
    description: '소설 공방 ID',
  })
  @IsNumber()
  novelRoomId: number;
}
