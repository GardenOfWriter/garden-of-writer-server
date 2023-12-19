import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { novelRoomType } from 'src/novel-room/entities/enum/novel-room-type.enum';

export class CreateNovelRoomDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsEnum(novelRoomType)
  type: novelRoomType;
}
