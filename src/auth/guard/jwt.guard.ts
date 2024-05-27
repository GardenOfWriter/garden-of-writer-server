import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredException, UnAuthorizedAccessException } from '../exceptions/auth.exception';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtGuard.name);
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    if (err || !user) {
      if (info && info.name === 'TokenExpiredError') {
        this.logger.error('err = ', JSON.stringify(err));
        this.logger.error('user =', JSON.stringify(user));
        this.logger.error('info =', JSON.stringify(info));
        throw new TokenExpiredException();
      } else {
        throw new UnAuthorizedAccessException();
      }
    }
    return user;
  }
}
