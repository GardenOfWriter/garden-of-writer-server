import { LoginUserDto } from '@app/auth/dto/login-user.dto';
import { TokenPayload } from '@app/auth/interface/auth.interface';
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

  async validateUser(
    dto: LoginUserDto,
  ): Promise<{ accessToken: string } | undefined> {
    const user: UserEntity = await this.userService.findByFields({
      select: ['id', 'email', 'password'], // 패스워드 컬럼은 select 가 기본 false 되어있어서 find 할때 명시를 해줘야함
      where: { email: dto.email },
    });
    /**
     *  유저 이메일 정보 확인
     */
    if (!user) {
      throw new UserIncorrectEmailException();
    }
    /**
     * 패스워드 유효성 확인
     */
    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UserIncorrectPasswordException();
    }
    return this.generateToken(user.id, user.email);
  }

  public logoutUser() {
    return `Authentication=; HttpOnly; Path=/; Max=Age=0`;
  }

  /*
   * 토큰 생성 함수
   */
  private async generateToken(id: number, email: string) {
    const payload: TokenPayload = { id, email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: '3d',
      algorithm: 'HS256',
    });
    return { accessToken };
  }
}
