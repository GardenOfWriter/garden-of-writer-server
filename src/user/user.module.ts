import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      userEntity, //
      Repository<userEntity>,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
