import { NovelRoomCategoryType } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoomCategoryDescription } from '../../entities/enum/novel-room-category.enum';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { CreateNovelRoomDto } from './create-novel-room.dto';

export class UpdateNovelRoomDto extends PickType(CreateNovelRoomDto, [
  'summary',
  'subTitle',
  'novelTags',
  'bookCover',
  'category',
  'character',
] as const) {}
