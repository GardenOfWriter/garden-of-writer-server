import { UserEntity } from '@app/user/entities/user.entity';
import { UserRepository } from '@app/user/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from '../../commons/util/data.helper';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private dataSource: Repository<UserEntity>,
  ) {}
  async addRow(entity: UserEntity): Promise<void> {
    await this.dataSource.save(entity);
  }
  async updateRow(id: number, entity: UserEntity): Promise<void> {
    await this.dataSource.update({ id }, entity);
  }
  async deleteUser(id: number): Promise<void> {
    await this.dataSource.delete({
      id,
    });
    return;
  }
  findByUserId(userId: number): Promise<UserEntity> {
    return this.dataSource.findOne({
      where: {
        id: userId,
      },
    });
  }

  async findByNickname(nickname: string): Promise<UserEntity> {
    return await this.dataSource.findOne({
      where: {
        nickname,
      },
    });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    if (isEmpty(email)) return null;
    return await this.dataSource.findOneBy({
      email,
    });
  }
  async findByNicknameEmail(email: string, nickname: string): Promise<UserEntity> {
    const result = await this.dataSource.findOne({
      where: {
        email,
        nickname,
      },
    });
    return result;
  }

  async findAll() {
    return await this.dataSource.createQueryBuilder().select('user.ems').getRawMany();
  }

  async existEmail(email: string): Promise<boolean> {
    const result = await this.dataSource.exist({
      where: {
        email,
      },
    });
    return !!result;
  }
  async existNickname(nickname: string): Promise<boolean> {
    const result = await this.dataSource.exist({
      where: {
        nickname,
      },
    });
    return !!result;
  }
}
