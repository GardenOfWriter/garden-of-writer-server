import { NovelRoomModule } from '@app/novel-room/novel-room.module';
import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArgumentInvalidException } from './commons/exception/argument-invalid.exception';
import { GlobalExceptionFilter } from './commons/filter/global-exception.filter';
import { ResponseInterceptor } from './commons/interceptor/response.interceptor';
import { NovelTextModule } from './novel-text/novel-text.module';

import { NovelTagModule } from '@app/novel-tag/novel-tags.module';
import { ChapterModule } from './chapter/chapter.module';
import { ChapterSubscriber } from './chapter/subscriber/chapter.subscriber';
import { EmailModule } from './commons/email/emai.module';
import { EmailServiceToken } from './commons/email/email.service';
import { EmailServiceImpl } from './commons/email/email.service.impl';
import { NovelAttendBoardModule } from './novel-attend-board/novel-attend-board.module';
import { NovelWriterModule } from './novel-writer/novel-writer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      schema: process.env.DB_SCHEMA,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      subscribers: [ChapterSubscriber],
    }),
    EmailModule,
    PassportModule,
    JwtModule.register({}),
    UserModule,
    NovelTextModule,
    AuthModule,
    NovelRoomModule,
    NovelWriterModule,
    ChapterModule,
    NovelAttendBoardModule,
    NovelTagModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: EmailServiceToken,
      useClass: EmailServiceImpl,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transformOptions: {
            enableImplicitConversion: true,
          },
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          exceptionFactory: (errors: ValidationError[]) => {
            const constraints = errors.map((_error) =>
              Object.values(_error.constraints),
            )[0];
            console.log(constraints);
            throw new ArgumentInvalidException(constraints);
          },
        }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
