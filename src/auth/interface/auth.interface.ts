import { UserEntity } from '@app/user/entities/user.entity';
import { Request } from 'express';

export interface TokenPayload {
  id: number;
  email: string;
}

export interface RequestUser extends Request {
  user: UserEntity;
}

export interface TokenResult {
  accessToken: string;
}
