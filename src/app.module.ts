// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigModule aur ConfigService import kiya
import { ProductsModule } from './products/products.module';
import { AuthModule } from './products/auth/auth.module';
import { UsersModule } from './products/users/users.module';

@Module({
  imports: [
    // 1. Configuration Module ko load karen
    ConfigModule.forRoot({
      isGlobal: true, // Taa-ke yeh har jgah available ho
    }),
    
    // 2. Mongoose connection ko Async tareeqay se configure karen
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Mongoose ko batana hai ke ConfigModule ki zaroorat hai
      useFactory: async (configService: ConfigService) => ({
        // .env file se DATABASE_URL variable ki value nikalen
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService], // ConfigService ko inject karen taa-ke use kiya jaa sake
    }),
    
    // Aapke baaki modules
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}