import { UserEmailAlreadyExistsException, UserNicknameAlreadyExistsException } from '@app/auth/exceptions/auth.exception';
import { isEmpty } from '@app/commons/util/data.helper';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserRepository, UserRepositoryToken } from '@app/user/repository/user.repository';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @Inject(UserRepositoryToken)
    private userRepository: UserRepository,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async create(joinUser: Partial<UserEntity>): Promise<void> {
    this.logger.log(`Join User ${JSON.stringify(joinUser)}`);
    const checkEmail = await this.userRepository.existEmail(joinUser.email);
    if (checkEmail) throw new UserEmailAlreadyExistsException();
    const checkNickname = await this.userRepository.existNickname(joinUser.nickname);
    if (checkNickname) throw new UserNicknameAlreadyExistsException();
    joinUser.checkRegexPassword();
    await this.userRepository.addRow(joinUser);
    return;
  }

  async findEmail(email: string) {
    const checkEmail = await this.userRepository.findByEmail(email);
    return checkEmail;
  }
  async checkUserEmail(email: string) {
    console.log(email);
    const checkEmail = await this.userRepository.findByEmail(email);
    if (isEmpty(checkEmail)) return true;
    return false;
  }
  async checkUserNickname(nickname: string) {
    const checkNickname = await this.userRepository.findByNickname(nickname);
    console.log(checkNickname);
    if (isEmpty(checkNickname)) return true;
    return false;
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findByUserId(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
