import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Production check
  const isProduction = process.env.NODE_ENV === 'production';
  
  // CORS Setup
  app.enableCors({
    origin: isProduction 
      ? ['https://gymberista.vercel.app'] 
      : ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Agar Vercel pe deploy ho raha hai, toh app.listen() ko skip karein
  if (!isProduction) {
    const port = process.env.PORT || 5000;
    await app.listen(port);
    console.log(`🚀 Backend is running on: http://localhost:${port}`);
  } else {
    // Production mein sirf initialize karein
    await app.init();
  }
}

// Sirf local development mein bootstrap() call karein
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

export { bootstrap };