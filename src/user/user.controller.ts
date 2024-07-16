import { JoinUserDto } from '@app/user/dto/join-user.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CheckNicknameDto } from './dto/check-nickname.dto';
import { CheckEmailDto } from './dto/check-email.dto';

@ApiTags('유저')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('/join')
  async create(@Body() userData: JoinUserDto): Promise<void> {
    const joinUser = userData.toEntity();
    await this.userService.create(joinUser);
    return;
  }

  @ApiOperation({
    summary: '회원 이메일 중복 체크',
  })
  @Post('/check-email')
  async checkUserEmail(@Body() dto: CheckEmailDto) {
    const result = await this.userService.checkUserEmail(dto.email);
    return { result };
  }

  @ApiOperation({
    summary: '회원 닉네임 중복 체크',
  })
  @Post('/check-nickname')
  async checkUserNickname(@Body() dto: CheckNicknameDto) {
    const result = await this.userService.checkUserNickname(dto.nickname);
    return { result };
  }
  //post맨에서 user/{id}로 get해야 됨.
  @ApiOperation({
    summary: '회원조회',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @ApiOperation({
    summary: '회원 이메일 조회',
  })
  @Get()
  async findById(@Query('email') email: string): Promise<UserEntity> {
    return this.userService.findEmail(email);
  }

  @ApiOperation({
    summary: '회원탈퇴',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(+id);
  }
}
