import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JoinUserDto } from 'src/user/dto/join-user.dto';
import { userEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: JoinUserDto): Promise<userEntity> {
    return await this.userService.create(userData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<userEntity> {
    return this.userService.findUser(+id);
  }
}
