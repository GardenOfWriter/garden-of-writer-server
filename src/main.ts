import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BaseAPIDocumentBuilder } from './commons/swagger/api.document';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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

  await app.listen(3000);
  process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
