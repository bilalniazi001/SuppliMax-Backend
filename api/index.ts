// api/index.ts - SIMPLE VERSION
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import express from 'express';
import serverless from 'serverless-http';

const app = express();

async function bootstrap() {
  const nestApp = await NestFactory.create(
    AppModule,
    new (require('@nestjs/platform-express')).ExpressAdapter(app)
  );

  // CORS setup
  nestApp.enableCors({
    origin: [
      'http://localhost:3000',
      'https://gymberista.vercel.app',
      'https://supplimax.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await nestApp.init();
}

bootstrap();

// Export for Vercel
export default serverless(app);