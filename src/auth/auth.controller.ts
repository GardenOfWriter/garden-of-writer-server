import { AuthService } from '@app/auth/auth.service';
import { LoginUserDto } from '@app/auth/dto/login-user.dto';
import { RequestUser } from '@app/auth/interface/auth.interface';
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { NovelWriterService } from '../novel-writer/novel-writer.service';
import { JwtGuard } from './guard/jwt.guard';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly writerService: NovelWriterService,
  ) {}
  @ApiOperation({
    summary: '로그인',
  })
  @ApiResponse({
    schema: {
      properties: {
        accessToken: {
          description: '로그인 토큰',
        },

        hasRoom: {
          description:
            '소셜 공방 참여 이력 값, 참여 이력이 있음 treu,참여 이력이 없음 : false',
        },
      },
    },
  })
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
  async logout(
    @Req() request: RequestUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.setHeader('Set-Cookie', this.authService.logoutUser());
    return;
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtGuard)
  @Get('guard')
  async guardTest(@CurrentUser() user) {
    console.log('user', user);
    return 'test';
  }
}
