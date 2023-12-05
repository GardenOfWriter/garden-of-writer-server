import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;
}
