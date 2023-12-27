import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { NovelWirterDto } from '../novel-writer.dto';
import { userEntity } from '../../../user/entities/user.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import {
  NovelWriterCategoryEnum,
  NovelWriterCategoryType,
} from '../../entities/enums/novel-writer-category.enum';
import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';

export class UpdateNovelWriterStatusRequestDto extends PickType(
  NovelWirterDto,
  ['novelRoomId', 'status'],
) {
  @ApiProperty({
    example: 1,
    description: '수정 Id',
  })
  @IsNumber()
  userId: number;
}
