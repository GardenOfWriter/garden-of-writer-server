import { IsString } from 'class-validator';

export class CheckNicknameDto {
  @IsString()
  nickname: string;
}
