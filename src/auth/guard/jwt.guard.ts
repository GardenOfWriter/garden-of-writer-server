import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnAuthorizedAccessException } from '../exceptions/unauthorized-access.exception';
import { TokenExpiredException } from '../exceptions/token-expired.exception';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtGuard.name);
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      if (info && info.name === 'TokenExpiredError') {
        this.logger.error('err = ', JSON.stringify(err));
        this.logger.error('user =', JSON.stringify(user));
        throw new TokenExpiredException();
      } else {
        throw new UnAuthorizedAccessException();
      }
    }
    return user;
  }
}
