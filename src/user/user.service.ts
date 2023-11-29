import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinUserDto } from 'src/user/dto/join-user.dto';
import { userEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
  ) {}

  findAll(): Promise<userEntity[]> {
    console.log('모든 유저 조회');
    return this.userRepository.find();
  }

  async create(userData: JoinUserDto): Promise<userEntity> {
    const { email, nickname, password } = userData;

    const user = new userEntity();
    user.email = email;
    user.nickname = nickname;
    user.password = password;

    await this.userRepository.save(user);
    user.password = undefined;

    return user;
  }

  async findUser(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}
