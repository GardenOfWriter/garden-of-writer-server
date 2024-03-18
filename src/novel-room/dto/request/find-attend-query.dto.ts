import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import {
  DescriptionProperty,
  NovelRoomAttendQueryEnum,
  NovelRoomAttendQueryType,
} from './enum/room-attend-query.enum';

export class FindAttendQueryDto extends BasePaginationRequest {
  @ApiProperty({ ...DescriptionProperty.ROOM_STATUS })
  @IsEnum(Object.values(NovelRoomAttendQueryEnum), {
    message: `roomStatus 는 ${NovelRoomAttendQueryEnum.ATTENDING} 과 ${NovelRoomAttendQueryEnum.NON_ATTENDING} 입력 가능합니다.`,
  })
  @IsString({ message: '룸 참여 상태를 입력해 주세요' })
  roomStatus: NovelRoomAttendQueryType;

  queryConvertStatus(): WriterStatusType[] {
    return this.roomStatus === NovelRoomAttendQueryEnum.ATTENDING
      ? ['attending']
      : ['reject', 'review', 'exit'];
  }
}
