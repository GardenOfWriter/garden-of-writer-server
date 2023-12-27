import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNumber, IsString } from 'class-validator';
import {
  NovelWriterStatusEnum,
  NovelWriterStatusType,
} from '../entities/enums/novel-writer-status.enum';

export class NovelWirterDto {
  @ApiProperty({
    enum: NovelWriterStatusEnum,
    example: NovelWriterStatusEnum.ATTENDING,
    description: '작가 참여 상태',
  })
  @IsIn(Object.values(NovelWriterStatusEnum))
  status: NovelWriterStatusType;

  @ApiProperty({
    example: '회차 제목',
    description: '회차 제목',
  })
  z;
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: '소설공방 ID',
  })
  @IsNumber()
  novelRoomId: number;
}
