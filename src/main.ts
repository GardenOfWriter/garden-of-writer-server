import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { BaseAPIDocumentBuilder } from './commons/swagger/api.document';
import { SocketIoAdpater } from './chats/adapter/socket-io.adapter';
async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const documentOptions = new BaseAPIDocumentBuilder().initializeOptions();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('docs/api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000', 'https://garden-writer-front-j5jw11b0p-jundevs-projects.vercel.app'],
    credentials: true,
  });
  app.use(cookieParser()); // 쿠키 파서 사용
  // app.useWebSocketAdapter(new SocketIoAdpater(app)); // 웹소켓 어댑터 사용
  // JSON 직렬화를 위해 필요
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT);
  process.on('SIGINT', async () => {
    logger.log('Received SIGINT. Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
