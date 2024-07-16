import { UserEntity } from '@app/user/entities/user.entity';
import { UserRepositoryImpl } from '@app/user/repository/user.repository.impl';
import { Provider } from '@nestjs/common';

export const UserRepositoryToken = 'UserRepository';
export const UserRepositoryProvider: Provider = {
  provide: UserRepositoryToken,
  useClass: UserRepositoryImpl,
};
export interface UserRepository {
  addRow(entity: Partial<UserEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<UserEntity>): Promise<void>;
  deleteUser(id: number): Promise<void>;
  existEmail(email: string): Promise<boolean>;
  existNickname(nickname: string): Promise<boolean>;
  findByUserId(userId: number): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findByNickname(nickname: string): Promise<UserEntity>;
  findByNicknameEmail(email: string, nickname: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
}
