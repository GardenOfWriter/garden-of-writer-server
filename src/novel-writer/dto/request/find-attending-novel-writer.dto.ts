import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindAttendingNovelWrite {
  @ApiProperty({
    example: 1,
    description: '공방 룸 ID',
  })
  @IsNumber()
  novelRoomId: number;
}
