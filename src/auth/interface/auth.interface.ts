import { Request } from 'express';
import { userEntity } from 'src/user/entities/user.entity';

export interface TokenPayload {
  id: number;
  email: string;
}

export interface RequestUser extends Request {
  user: userEntity;
}
