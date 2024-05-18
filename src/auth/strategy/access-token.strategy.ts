import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { TokenPayload } from '../interface/auth.interface';
import { UserService } from '../../user/user.service';
import { UserNotExistsException } from '../exceptions/auth.exception';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload, done: VerifiedCallback) {
    const user = await this.userService.findById(payload.id);
    if (!user) return done(new UserNotExistsException(), false);
    return done(null, user);
  }
}
