
import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async checkHealth() {
    try {
      await this.dataSource.query('SELECT 1');

      return {
        status: 'ok',
        service: 'HARVIZY API',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        service: 'HARVIZY API',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
