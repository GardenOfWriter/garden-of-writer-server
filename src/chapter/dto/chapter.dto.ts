import {
  NovelTextStatusType,
  NoveTextStatusEnum,
} from '@app/novel-text/entities/enum/novel-text-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { ChapterStatusEnum } from '../../novel-board/entities/enum/novel-board-status.enum';
import { ChapterStatusType } from '../entities/enum/chapter-status.enum';

export class ChapterDto {
  @ApiProperty({
    enum: ChapterStatusEnum,
    example: 'writing',
    description:
      'writing(작성중) | review(연재검토중) | approve(연재승인) || reject(연재 거절) ',
  })
  @IsIn(Object.values(ChapterStatusEnum))
  status: ChapterStatusType;

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
