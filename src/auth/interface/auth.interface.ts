import { Request } from 'express';
import { userEntity } from 'src/user/entities/user.entity';

export interface Payload {
  id: number;
  email: string;
}

export interface RequestUser extends Request {
  user: userEntity;
}
