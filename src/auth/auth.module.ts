import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { AccessTokenStrategy } from './strategy/access-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '3d' },
    }),
  ],

  exports: [TypeOrmModule, JwtGuard],
  providers: [AuthService, UserService, JwtGuard, AccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
