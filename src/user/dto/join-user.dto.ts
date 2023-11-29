import { IsEmail, IsString } from 'class-validator';

export class JoinUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly password: string;
}
