import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): Record<string, unknown> {
    return {
      name: 'Train Schedule API',
      status: 'ok',
      repository: 'https://github.com/KOTAYE/Test_Task_KS',
      endpoints: {
        health: 'GET /api/health',
        trains: 'GET /api/trains',
        train: 'GET /api/trains/:id',
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
      },
    };
  }

  getHealth(): { status: string; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
