import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export const NovelRoomAttendQueryEnum = {
  PARTICIPATING: 'participating',
  NOT_PARTICIPATING: 'not_participating',
} as const;

export type NovelRoomAttendQueryType =
  (typeof NovelRoomAttendQueryEnum)[keyof typeof NovelRoomAttendQueryEnum];

export const DescriptionProperty = {
  ROOM_STATUS: {
    enum: NovelRoomAttendQueryEnum,
    example: NovelRoomAttendQueryEnum.PARTICIPATING,
    description: `${NovelRoomAttendQueryEnum.PARTICIPATING} : 참여,
                    ${NovelRoomAttendQueryEnum.NOT_PARTICIPATING} : 미참여`,
  },
} as const;

export class FindAttendQueryDto extends BasePaginationRequest {
  @ApiProperty({ ...DescriptionProperty.ROOM_STATUS })
  @IsEnum(Object.values(NovelRoomAttendQueryEnum), {
    message: `roomStatus 는 ${NovelRoomAttendQueryEnum.NOT_PARTICIPATING} 과 ${NovelRoomAttendQueryEnum.PARTICIPATING} 입력 가능합니다.`,
  })
  @IsString({ message: '룸 참여 상태를 입력해 주세요' })
  roomStatus: NovelRoomAttendQueryType;

  queryConvertStatus(): WriterStatusType[] {
    return this.roomStatus === NovelRoomAttendQueryEnum.NOT_PARTICIPATING
      ? ['reject', 'review', 'exit']
      : ['attending'];
  }
}
