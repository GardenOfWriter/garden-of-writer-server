import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { Payload } from 'src/auth/interface/auth.interface';
import { userEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, //
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string } | undefined> {
    const userFind: userEntity = await this.userService.findByFields({
      where: { email: loginUserDto.email },
    });
    const validatePassword = await bcrypt.compare(
      loginUserDto.password,
      userFind.password,
    );
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException('비밀번호를 확인해 주세요');
    }

    const payload: Payload = { id: userFind.id, email: userFind.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public logoutUser() {
    return `Authentication=; HttpOnly; Path=/; Max=Age=0`;
  }
}
