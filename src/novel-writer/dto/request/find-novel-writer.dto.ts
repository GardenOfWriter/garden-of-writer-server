import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindNovelWriteManagementDto extends BasePaginationRequest {
  @ApiProperty({
    example: 1,
    description: '공방 룸 ID',
  })
  @IsNumber()
  novelRoomId: number;
}
