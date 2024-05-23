import { NovelRoomModule } from '@app/novel-room/novel-room.module';
import { MiddlewareConsumer, Module, NestModule, ValidationError, ValidationPipe, forwardRef } from '@nestjs/common';
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

import { MessageEntity } from './message/message.entity';
import { NovelTagModule } from './novel-tag/novel-tags.module';
import { ChapterModule } from './chapter/chapter.module';
import { ChatsModule } from './chats/chats.module';
import { EmailModule } from './commons/email/emai.module';
import { EmailServiceToken } from './commons/email/email.service';
import { EmailServiceImpl } from './commons/email/email.service.impl';
import { NovelAttendBoardModule } from './novel-attend-board/novel-attend-board.module';
import { NovelWriterModule } from './novel-writer/novel-writer.module';
import { UserModule } from './user/user.module';
import { ErrorsInterceptor } from './commons/interceptor/error.interceptor';
import { AppHeaderProvider } from './commons/provider/app-header.provider';

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
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
    }),
    EmailModule,
    PassportModule,
    JwtModule.register({}),
    forwardRef(() => NovelRoomModule),
    UserModule,
    NovelTextModule,
    AuthModule,
    NovelWriterModule,
    ChapterModule,
    NovelAttendBoardModule,
    NovelTagModule,
    ChatsModule,
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
            const constraints = errors.map((_error) => Object.values(_error.constraints))[0];
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppHeaderProvider).forRoutes('*');
  }
}
