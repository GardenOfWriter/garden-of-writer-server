import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChapterCommentReqDto {
  @AutoMap()
  @ApiProperty({
    example: `댓글입니다.`,
    description: '회차 댓글',
  })
  @IsString()
  readonly comment: string;
}
