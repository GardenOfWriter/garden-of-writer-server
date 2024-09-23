import { UserEntity } from '@app/user/entities/user.entity';
import { UserRepositoryToken } from '@app/user/repository/user.repository';
import { UserRepositoryImpl } from '@app/user/repository/user.repository.impl';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { AuthModule } from '@app/auth/auth.module';
import { AuthService } from '@app/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, //
    ]),
  ],
  providers: [
    UserService,
    UserRepository,
    {
      provide: UserRepositoryToken,
      useClass: UserRepositoryImpl,
    },
  ],

  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
