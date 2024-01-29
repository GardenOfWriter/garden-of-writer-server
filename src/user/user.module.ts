import { UserEntity } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, //
      Repository<UserEntity>,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
