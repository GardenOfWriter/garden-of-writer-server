import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnAuthorizedAccessException } from '../exceptions/unauthorized-access.exception';
import { TokenExpiredException } from '../exceptions/token-expired.exception';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      if (info && info.name === 'TokenExpiredError') {
        throw new TokenExpiredException();
      } else {
        throw new UnAuthorizedAccessException();
      }
    }
    return user;
  }
}
