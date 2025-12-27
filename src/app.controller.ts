import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get()
  getHello() {
    return { 
      message: 'Supplimax Backend API is running!',
      status: 'OK',
      timestamp: new Date().toISOString()
    };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };
  }
}