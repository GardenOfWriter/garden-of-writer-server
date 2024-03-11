import { UserEntity } from '@app/user/entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.getAll();
  }

  async create(joinUser: UserEntity): Promise<void> {
    const user = await this.userRepository.getByNicknameEmail(
      joinUser.email,
      joinUser.nickname,
    );
    if (user.email) throw new ConflictException('중복된 닉네임이 존재합니다.');
    if (user.nickname)
      throw new ConflictException('중복된 이메일 계정이 존재합니다.');
    user.checkRegexPassword();
    await this.userRepository.addRow(user);
    return;
  }

  async findEmail(email: string) {
    const checkEmail = await this.userRepository.getByEmail(email);
    return checkEmail;
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.getById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
