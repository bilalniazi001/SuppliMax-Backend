// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Setup
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://gymberista.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Sirf local development ke liye port listen karein
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    await app.listen(port);
    console.log(`🚀 Backend is running on: http://localhost:${port}`);
  } else {
    // Production mein sirf initialize
    await app.init();
  }
}

// Sirf agar production nahi hai toh bootstrap karein
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}