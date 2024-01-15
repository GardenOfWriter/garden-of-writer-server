import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export const NovelRoomAttendQueryEnum = {
  PARTICIPATING: 'participating',
  NOT_PARTICIPATING: 'not_participating',
} as const;

export type NovelRoomAttendQueryType =
  (typeof NovelRoomAttendQueryEnum)[keyof typeof NovelRoomAttendQueryEnum];

export class FindAttendQueryDto {
  @ApiProperty({
    enum: NovelRoomAttendQueryEnum,
    example: NovelRoomAttendQueryEnum.PARTICIPATING,
    description: '참여 | 미참여 ',
  })
  @IsEnum(Object.values(NovelRoomAttendQueryEnum), {
    message: `roomStatus 는 ${NovelRoomAttendQueryEnum.NOT_PARTICIPATING} 과 ${NovelRoomAttendQueryEnum.PARTICIPATING} 입력 가능합니다.`,
  })
  @IsString({ message: '룸 참여 상태를 입력해 주세요' })
  roomStatus: NovelRoomAttendQueryType;

  queryConvertStatus(): NovelWriterStatusType[] {
    return this.roomStatus === NovelRoomAttendQueryEnum.NOT_PARTICIPATING
      ? ['attendingReject', 'attendingReview', 'exit']
      : ['attending'];
  }
}
