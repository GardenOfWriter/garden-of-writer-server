import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import {
  PASSWORD_REG_EXP,
  PASSWORD_REG_EXP_ERROR_MESSAGE,
} from 'src/commons/reg-exp/reg-exp';
import { JoinUserDto } from 'src/user/dto/join-user.dto';
import { userEntity } from 'src/user/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
  ) {}

  async findAll(): Promise<userEntity[]> {
    return this.userRepository.find();
  }

  async create(userData: JoinUserDto): Promise<userEntity> {
    const { email, nickname, password } = userData;

    const user = new userEntity();
    user.email = email;
    user.nickname = nickname;
    user.password = password;

    const checkNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (checkNickname) {
      throw new ConflictException('중복된 닉네임이 존재합니다.');
    }

    if (checkEmail) {
      throw new ConflictException('중복된 이메일 계정이 존재합니다.');
    }

    if (PASSWORD_REG_EXP.test(user.password) === false) {
      throw new BadRequestException(PASSWORD_REG_EXP_ERROR_MESSAGE);
    }

    await this.userRepository.save(user);

    return user;
  }

  async findByFields(
    options: FindOneOptions<LoginUserDto | userEntity>,
  ): Promise<userEntity | undefined> {
    return await this.userRepository.findOne(options);
  }

  async findById(id: number): Promise<userEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({
      id: id,
    });
  }
}
