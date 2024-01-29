import { EmailModule } from '@app/commons/email/emai.module';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { NovelWriterModule } from '@app/novel-writer/novel-writer.module';
import { NovelWriterService } from '@app/novel-writer/novel-writer.service';
import { NovelWriterRepositoryToken } from '@app/novel-writer/repository/novel-writer.repository';
import { NovelWriterRepositoryImpl } from '@app/novel-writer/repository/novel-writer.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { AccessTokenStrategy } from './strategy/access-token.strategy';

@Module({
  imports: [
    EmailModule,
    NovelWriterModule,
    TypeOrmModule.forFeature([UserEntity, NovelWriterEntity]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '3d' },
    }),
  ],

  exports: [TypeOrmModule, JwtGuard],
  providers: [
    AuthService,
    UserService,
    JwtGuard,
    AccessTokenStrategy,
    NovelWriterService,
    {
      provide: NovelWriterRepositoryToken,
      useClass: NovelWriterRepositoryImpl,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
