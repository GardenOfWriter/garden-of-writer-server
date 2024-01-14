import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { RequestUser } from 'src/auth/interface/auth.interface';
import { JwtGuard } from './guard/jwt.guard';
import { NovelWriterService } from '../novel-writer/novel-writer.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly writerService: NovelWriterService,
  ) {}

  @Post('/login')
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const jwt = await this.authService.validateUser(dto);
    const hasRoom = await this.writerService.checkRoomParticiate(dto.email);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('accessToken', jwt.accessToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return { ...jwt, hasRoom };
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
