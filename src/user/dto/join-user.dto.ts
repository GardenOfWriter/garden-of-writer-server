import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class JoinUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    example: 'nickname',
    description: '유저 닉네임',
  })
  @IsString()
  readonly nickname: string;

  @ApiProperty({
    example: 'ab123456!@',
    description: '유저 패스워드',
  })
  @IsString()
  readonly password: string;
}
