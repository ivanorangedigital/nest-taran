import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('ORIGIN'),
    credentials: true,
    exposedHeaders: ['total', 'total_pages']
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
