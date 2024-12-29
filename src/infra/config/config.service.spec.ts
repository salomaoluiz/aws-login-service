import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { ConfigService as NestConfigService } from '@nestjs/config';

const envs = {
  MYSQL_HOST: 'localhost',
  MYSQL_PORT: 3306,
  MYSQL_PASSWORD: 'root',
  MYSQL_USER: 'root',
  MYSQL_DATABASE: 'test',
  AWS_REGION: 'us-east-1',
  AWS_ACCESS_KEY_ID: 'aws_access_key_id',
  AWS_SECRET_ACCESS_KEY: 'aws_secret_access_key',
};

describe('ConfigService', () => {
  let service: ConfigService;

  const mockNestConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      return envs[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        { provide: NestConfigService, useValue: mockNestConfigService },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the envs correctly', () => {
    expect(service.MYSQL_HOST).toBe('localhost');
    expect(service.MYSQL_PORT).toBe(3306);
    expect(service.MYSQL_PASSWORD).toBe('root');
    expect(service.MYSQL_DATABASE).toBe('test');
    expect(service.MYSQL_USER).toBe('root');
    expect(service.AWS_REGION).toBe('us-east-1');
    expect(service.AWS_ACCESS_KEY_ID).toBe('aws_access_key_id');
    expect(service.AWS_SECRET_ACCESS_KEY).toBe('aws_secret_access_key');
  });
});
