import { CurrentUser } from '@app/commons/decorator/current-user.decorater';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { RequestUser } from 'src/auth/interface/auth.interface';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const jwt = await this.authService.validateUser(loginUserDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('accessToken', jwt.accessToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return jwt;
  }

  @Post('logout')
  async logout(@Req() request: RequestUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.logoutUser());
    return response.sendStatus(200);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtGuard)
  @Get('guard')
  async guardTest(@CurrentUser() user) {
    console.log('user', user);
    return 'success';
  }
}
