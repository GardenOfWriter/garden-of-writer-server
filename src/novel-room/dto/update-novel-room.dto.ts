import { NovelRoomCategory } from '@app/novel-board/entities/enum/novel-room-category.enum';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNovelRoomDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category: NovelRoomCategory;
}
