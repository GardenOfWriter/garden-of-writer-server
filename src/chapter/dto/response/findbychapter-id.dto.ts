import { ChapterStatusEnum, ChapterStatusType } from '@app/chapter/entities/enums/chapter-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ChapterEntity } from '../../entities/chapter.entity';
import { AutoMap } from '@automapper/classes';

export class FindChapterRoomIdResDto {
  @AutoMap()
  @ApiProperty({
    example: 1,
    description: '회차 ID',
  })
  @Expose()
  readonly id: number;
  @AutoMap()
  @ApiProperty({
    example: 1,
    description: '회차 no',
  })
  @Expose()
  readonly no: number;

  @AutoMap()
  @ApiProperty({
    enum: ChapterStatusEnum,
    example: ChapterStatusEnum.WRITING,
    description: '회차 상태',
  })
  @Expose()
  readonly status: ChapterStatusType;

  @AutoMap()
  @ApiProperty({
    example: '프롤로그',
    description: '회차명',
  })
  @Expose()
  readonly title: string;

  @AutoMap()
  @ApiProperty({
    example: '2023-01-01 10:00:00',
    description: '연재 승인일',
  })
  @Expose({ name: 'approvalAt' })
  readonly approvalAt: Date;

  @AutoMap()
  @ApiProperty({
    example: '2023-01-01 10:00:00',
    description: '최종 작성일',
  })
  @Expose({ name: 'finalAt' })
  readonly finalAt: Date;

  @AutoMap()
  @ApiProperty({
    example: 10,
    description: '조회수',
  })
  @Expose()
  readonly viewCount: number;

  @AutoMap()
  @ApiProperty({
    example: 10,
    description: '댓글수',
  })
  @Expose()
  readonly commentCount: number;

  @AutoMap()
  @ApiProperty({
    example: 5,
    description: '좋아요수',
  })
  @Expose()
  readonly likeCount: number;
}
