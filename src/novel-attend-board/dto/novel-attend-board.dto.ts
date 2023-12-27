import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';

export class NovelAttnedBoardDto {
  @ApiProperty({
    example: 1,
    description: '소설공방 Id',
  })
  @IsNumber()
  novelRoomId: number;
  @ApiProperty({
    example: 1,
    description: '참여작가 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 1,
    description: '참여작가 모집내용 ',
  })
  @IsString()
  content: string;
  @ApiProperty({
    example: 'https://kakaolink',
    description: '오픈 카카오톡 링크',
  })
  @IsString()
  openKakaoLink: string;

  toEntity(): Partial<NovelAttendBoardEntity> {
    return NovelAttendBoardEntity.of(
      this.novelRoomId,
      this.title,
      this.content,
      this.openKakaoLink,
    );
  }
}
