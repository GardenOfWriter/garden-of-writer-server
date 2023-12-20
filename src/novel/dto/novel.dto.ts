import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import {
  NovelStatusType,
  NoveStatusEnum,
} from '../entities/enum/novel-status.enum';

export class NovelDto {
  @ApiProperty({
    enum: NoveStatusEnum,
    example: 'writing (임시저장) | complete (작성완료)',
    description: 'writing (임시저장) | complete(작성완료)',
  })
  @IsIn(Object.values(NoveStatusEnum))
  status: NovelStatusType;

  @ApiProperty({
    example: '안녕하세요 참여 작가입니다.',
    description: '여기는 작성된 소설에 대한 텍스트',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 1,
    description: '회의 고유 ID',
  })
  @IsNumber()
  chapterId: number;
}
