import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { WriterStatusEnum, WriterStatusType } from '../entities/enums/writer-status.enum';

export class NovelWirterDto {
  @ApiProperty({
    enum: WriterStatusEnum,
    example: WriterStatusEnum.ATTENDING,
    description: `${WriterStatusEnum.ATTENDING} : 참여중,
                  ${WriterStatusEnum.REJECT} : 참여 반려,
                  ${WriterStatusEnum.REVIEW} : 참여 검토,
                  ${WriterStatusEnum.EXIT} : 퇴장`,
  })
  @IsIn(Object.values(WriterStatusEnum))
  status: WriterStatusType;

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
