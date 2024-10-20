import { IsEmail, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
  })
  @IsOptional()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'ab123456!@',
    description: '계정 페스워드',
  })
  @IsOptional()
  @Length(6, 20)
  password: string;
}
