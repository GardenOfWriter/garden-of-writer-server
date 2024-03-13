import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private dataSource: Repository<UserEntity>,
  ) {}

  async getAll() {
    return await this.dataSource
      .createQueryBuilder()
      .select('user.ems')
      .getRawMany();
  }
  async getById(id: number): Promise<UserEntity> {
    return await this.dataSource.findOne({
      where: { id },
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const result = await this.dataSource.findOne({
      where: {
        email,
      },
    });
    return result;
  }
  async getByNicknameEmail(
    email: string,
    nickname: string,
  ): Promise<UserEntity> {
    return await this.dataSource.findOne({
      where: {
        email,
        nickname,
      },
    });
  }

  async addRow(user: UserEntity) {
    await this.dataSource.save(user);
  }
  async deleteUser(id: number) {
    return await this.dataSource.delete(id);
  }
}
