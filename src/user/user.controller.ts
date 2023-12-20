import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JoinUserDto } from 'src/user/dto/join-user.dto';
import { userEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/join')
  async create(@Body() userData: JoinUserDto): Promise<userEntity> {
    return await this.userService.create(userData);
  }

  //post맨에서 user/{id}로 get해야 됨.
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.userService.findById(+id);
  }

  @Get()
  async findAll(): Promise<userEntity[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(+id);
  }
}
