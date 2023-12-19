import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNovelRoomDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category: string;
}
