import { EmailModule } from '@app/commons/email/emai.module';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { NovelWriterModule } from '@app/novel-writer/novel-writer.module';
import { NovelWriterService } from '@app/novel-writer/novel-writer.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { NovelWriterRepositoryProvider } from '@app/novel-writer/repository/novel-writer.repository';
import { UserModule } from '@app/user/user.module';
import { EmailServiceToken } from '@app/commons/email/email.service';
import { EmailServiceImpl } from '@app/commons/email/email.service.impl';

@Module({
  imports: [
    EmailModule,
    UserModule,
    forwardRef(() => NovelWriterModule),
    TypeOrmModule.forFeature([UserEntity, NovelWriterEntity]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '3d' },
    }),
  ],

  providers: [
    AuthService,
    JwtGuard,
    AccessTokenStrategy,
    {
      provide: EmailServiceToken,
      useClass: EmailServiceImpl,
    },
  ],
  exports: [JwtGuard, AuthService, AccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
