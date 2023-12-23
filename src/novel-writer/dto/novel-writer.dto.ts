import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import {
  NovelWriterStatusEnum,
  NovelWriterStatusType,
} from '../entities/enums/novel-writer.enum';

export class NovelWirterDto {
  @ApiProperty({
    enum: NovelWriterStatusEnum,
    example: 'writing',
    description:
      'writing(작성중) | review(연재검토중) | approve(연재승인) || reject(연재 거절) ',
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
