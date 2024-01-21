import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinUserDto } from 'src/user/dto/join-user.dto';
import { userEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@ApiTags('유저')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('/join')
  async create(@Body() userData: JoinUserDto): Promise<void> {
    await this.userService.create(userData);
    return;
  }

  //post맨에서 user/{id}로 get해야 됨.
  @ApiOperation({
    summary: '회원조회',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.userService.findById(+id);
  }

  @ApiOperation({
    summary: '회원 목록 조회',
  })
  @Get()
  async findAll(): Promise<userEntity[]> {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: '회원탈퇴',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(+id);
  }
}
