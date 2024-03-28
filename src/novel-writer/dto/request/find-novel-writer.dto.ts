import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class FindNovelWriteManagementrDto extends BasePaginationRequest {
  @ApiProperty({
    example: 1,
    description: '공방 룸 ID',
  })
  @IsNumberString()
  novelRoomId: number;
}
