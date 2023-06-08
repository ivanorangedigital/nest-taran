import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    exposedHeaders: ['total', 'total_pages']
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
