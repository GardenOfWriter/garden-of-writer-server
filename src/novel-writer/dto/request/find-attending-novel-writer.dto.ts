import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';

export class FindAttendingNovelWrite {
  @ApiProperty({
    example: 1,
    description: '공방 룸 ID',
  })
  @IsNumber()
  novelRoomId: number;
}
