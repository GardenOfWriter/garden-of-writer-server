import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelRoomModule } from 'src/novel-room/novel-room.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArgumentInvalidException } from './commons/exception/argument-invalid.exception';
import { GlobalExceptionFilter } from './commons/filter/global-exception.filter';
import { ResponseInterceptor } from './commons/interceptor/response.interceptor';
import { NovelTextModule } from './novel-text/novel-text.module';

import { UserModule } from './user/user.module';
import { NovelWriterModule } from './novel-writer/novel-writer.module';
import { ChapterModule } from './chapter/chapter.module';
import { NovelAttendBoardModule } from './novel-attend-board/novel-attend-board.module';
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
    }),
    PassportModule,
    JwtModule.register({}),
    UserModule,
    NovelTextModule,
    AuthModule,
    NovelRoomModule,
    NovelWriterModule,
    ChapterModule,
    NovelAttendBoardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
          exceptionFactory: (_error) => new ArgumentInvalidException(),
        }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
