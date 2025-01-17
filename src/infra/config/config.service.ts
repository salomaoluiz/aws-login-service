import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get MYSQL_HOST(): string {
    return this.configService.get<string>('MYSQL_HOST');
  }

  get MYSQL_PORT(): number {
    return this.configService.get<number>('MYSQL_PORT');
  }

  get MYSQL_PASSWORD(): string {
    return this.configService.get<string>('MYSQL_PASSWORD');
  }

  get MYSQL_USER(): string {
    return this.configService.get<string>('MYSQL_USER');
  }

  get MYSQL_DATABASE(): string {
    return this.configService.get<string>('MYSQL_DATABASE');
  }

  get AWS_REGION(): string {
    return this.configService.get<string>('AWS_REGION');
  }

  get AWS_ACCESS_KEY_ID(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID');
  }

  get AWS_SECRET_ACCESS_KEY(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get JWT_EXPIRES_IN(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN');
  }
}
