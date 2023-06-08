import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from 'config/configuration';
import { CookieGuard } from './guards/cookie.guard';
import { ImageModule } from './image/image.module';
import { CookieStrategy } from './passport-strategies/cookie.strategy';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService],
    }),
    ImageModule,
    CategoryModule,
    ProductModule
  ],
  controllers: [],
  providers: [
    CookieGuard,
    CookieStrategy
  ],
})
export class AppModule {}
