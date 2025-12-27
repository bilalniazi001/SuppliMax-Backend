import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; // Correct relative path
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessHttp from 'serverless-http'; // Default import use karein

let cachedServer: any;

async function bootstrapServer() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  // CORS Configuration
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://gymberista.vercel.app',
      'https://supplimax.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.init();
  return serverlessHttp(expressApp); // serverlessHttp as function call
}

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(event, context);
};

// Local development ke liye
if (process.env.NODE_ENV === 'development') {
  bootstrapServer().then(() => {
    console.log('🚀 Local development server started');
  });
}