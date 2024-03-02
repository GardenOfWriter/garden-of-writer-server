import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { ChatperStatusDescription } from '../entities/enums/chapter-status.enum';
import {
  ChapterStatusEnum,
  ChapterStatusType,
} from '../entities/enums/chapter-status.enum';

export class ChapterDto {
  @ApiProperty({
    example: 1,
    description: '회차 ID',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    ...ChatperStatusDescription,
  })
  @IsIn(Object.values(ChapterStatusEnum))
  status: ChapterStatusType;

  @ApiProperty({
    example: '회차 제목',
    description: '회차 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 1,
    description: '소설공방 row Id',
  })
  @IsNumber()
  novelRoomId: number;
}
