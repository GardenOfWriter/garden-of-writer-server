import { NovelRoomCategoryType } from '@app/novel-room/entities/enum/novel-room-category.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoomCategoryDescription } from '../../entities/enum/novel-room-category.enum';

export class UpdateNovelRoomDto {
  @ApiProperty({
    example: '부제목 1',
    description: '부제목',
  })
  @IsOptional()
  @IsString()
  subTitle: string;

  @ApiProperty({
    ...RoomCategoryDescription,
  })
  @IsOptional()
  @IsString()
  category: NovelRoomCategoryType;
}
