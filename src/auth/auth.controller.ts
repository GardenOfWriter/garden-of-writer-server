import { AuthService } from '@app/auth/auth.service';
import { LoginUserDto } from '@app/auth/dto/login-user.dto';
import { RequestUser, TokenResult } from '@app/auth/interface/auth.interface';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { NovelWriterService } from '../novel-writer/novel-writer.service';
import { JwtGuard } from './guard/jwt.guard';
import { Login, Logout } from './decorator/swagger.decorator';
import { UserService } from '@app/user/user.service';
import { JoinUserDto } from '@app/user/dto/join-user.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly writerService: NovelWriterService,
  ) {}
  @Login()
  @Post('/login')
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(dto);
    const hasRoom = await this.writerService.checkRoomStatusAttend(dto.email);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('accessToken', jwt.accessToken, {
      // domain: 'port-0-garden-of-writer-server-71t02clq3bpxzf.sel4.cloudtype.app',
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
    return { ...jwt, hasRoom };
  }

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('/joinUser')
  async create(@Body() userData: JoinUserDto): Promise<TokenResult> {
    const joinUser = userData.toEntity();
    await this.userService.create(joinUser);
    const accessToken = await this.authService.generateAccessToken(joinUser.id, joinUser.email);
    return accessToken;
  }

  @Logout()
  @Post('/logout')
  async logout(@Req() request: RequestUser, @Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    response.setHeader('Set-Cookie', this.authService.logoutUser());
    return;
  }

  @Post('/temp-password')
  async generateTempPassword(@Body('email') email: string): Promise<void> {
    await this.authService.createTempPassword({ email });
  }
}
