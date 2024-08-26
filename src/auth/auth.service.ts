import { LoginUserDto } from '@app/auth/dto/login-user.dto';
import { TokenPayload, TokenResult } from '@app/auth/interface/auth.interface';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserIncorrectEmailException, UserIncorrectPasswordException } from './exceptions/auth.exception';
import { EmailService, EmailServiceToken } from '@app/commons/email/email.service';
import { EmailTemplate } from '@app/commons/email/enums/teamplate.enums';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService, //
    private readonly jwtService: JwtService,
    @Inject(EmailServiceToken)
    private readonly emailService: EmailService,
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

  async generateTempPassword({ email }: { email: string }): Promise<void> {
    // const user = await this.userService.findEmail(email);
    // if (!user) throw new NotFoundException('User Not Found');
    // const tempPassword = Math.random().toString(36).substring(2, 11);
    // const hashedPassword = await bcrypt.hash(tempPassword, 10);
    // user.password = hashedPassword;
    // await this.userService.create(user);
    await this.emailService.sendEmail({
      to: 'cafejun17@gmail.com',
      subject: EmailTemplate.TEMP_PASSWORD.title,
      text: 'Test',
      template: EmailTemplate.TEMP_PASSWORD,
    });
  }

  /*
   * 토큰 생성 함수
   */
  private async generateAccessToken(id: number, email: string): Promise<TokenResult> {
    const payload: TokenPayload = { id, email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: '3d',
      algorithm: 'HS256',
    });
    return { accessToken };
  }

  /**
   * 토큰 검증
   */
  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_KEY,
    });
  }

  /**
   * Header로부터 토큰 받을 때
   */
  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }

    const token = splitToken[1];

    return token;
  }
}
