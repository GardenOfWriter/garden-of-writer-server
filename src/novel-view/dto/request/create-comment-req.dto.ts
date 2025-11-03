import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { NovelRoomCategoryEnum, NovelRoomCategoryType } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { NovelRoomStatusEnum, NovelRoomStatusType } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class CreateChapterCommentReqDto {
  @AutoMap()
  @ApiProperty({
    example: `댓글입니다.`,
    description: '회차 댓글',
  })
  @IsString()
  readonly comment: string;
}
