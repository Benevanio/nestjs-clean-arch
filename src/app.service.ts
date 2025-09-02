import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; timestamp: string } {
    return {
      message: 'Welcome to nestjs-clean-arch!',
      timestamp: new Date().toISOString(),
    }
  }
}
