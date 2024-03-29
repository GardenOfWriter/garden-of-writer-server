import { LoginUserDto } from '@app/auth/dto/login-user.dto';
import { TokenPayload, TokenResult } from '@app/auth/interface/auth.interface';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserIncorrectEmailException } from './exceptions/user-incorrect-email.exception';
import { UserIncorrectPasswordException } from './exceptions/user-incorrect-password.exception';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService, //
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginUserDto): Promise<TokenResult> {
    const user: UserEntity = await this.userService.findEmail(dto.email);
    if (!user) throw new UserIncorrectEmailException();
    const comparePassword = await bcrypt.compare(dto.password, user.password);
    this.logger.debug(`compare password ${comparePassword}`);
    if (!comparePassword) throw new UserIncorrectPasswordException();
    const token = this.generateAccessToken(user.id, user.email);
    return token;
  }

  public logoutUser() {
    const cookieExpire = `Authentication=; HttpOnly; Path=/; Max=Age=0`;
    return cookieExpire;
  }

  /*
   * 토큰 생성 함수
   */
  private async generateAccessToken(
    id: number,
    email: string,
  ): Promise<TokenResult> {
    const payload: TokenPayload = { id, email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: '3d',
      algorithm: 'HS256',
    });
    return { accessToken };
  }
}
