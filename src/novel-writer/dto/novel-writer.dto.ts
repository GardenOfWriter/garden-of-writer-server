import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import {
  NovelWriterStatusEnum,
  NovelWriterStatusType,
} from '../entities/enums/novel-writer-status.enum';

export class NovelWirterDto {
  @ApiProperty({
    enum: NovelWriterStatusEnum,
    example: NovelWriterStatusEnum.ATTENDING,
    description: `${NovelWriterStatusEnum.ATTENDING} : 참여중,
                  ${NovelWriterStatusEnum.ATTENDING_REJECT} : 참여 반려,
                  ${NovelWriterStatusEnum.ATTENDING_REVIEW} : 참여 검토,
                  ${NovelWriterStatusEnum.EXIT} : 퇴장`,
  })
  @IsIn(Object.values(NovelWriterStatusEnum))
  status: NovelWriterStatusType;

  @ApiProperty({
    example: '회차 제목',
    description: '회차 제목',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: '소설공방 ID',
  })
  @IsNumber()
  novelRoomId: number;
}
