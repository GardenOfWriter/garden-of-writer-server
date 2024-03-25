import { NovelRoomDuplicationSubTitleException } from '@app/novel-room/exceptions/duplicate-subtitle.exception';
import { UserEntity } from '@app/user/entities/user.entity';
import {
  UserRepository,
  UserRepositoryToken,
} from '@app/user/repository/user.repository';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    // private readonly userRepository: UserRepository,
    @Inject(UserRepositoryToken)
    private userRepository: UserRepository,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async create(joinUser: Partial<UserEntity>): Promise<void> {
    const user = await this.userRepository.findByNicknameEmail(
      joinUser.email,
      joinUser.nickname,
    );
    if (user.email) throw new NovelRoomDuplicationSubTitleException();
    if (user.nickname)
      throw new ConflictException('중복된 이메일 계정이 존재합니다.');
    user.checkRegexPassword();
    await this.userRepository.addRow(user);
    return;
  }

  async findEmail(email: string) {
    const checkEmail = await this.userRepository.findByEmail(email);
    return checkEmail;
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findByUserId(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
