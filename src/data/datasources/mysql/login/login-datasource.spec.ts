import { Test, TestingModule } from '@nestjs/testing';
import { LoginDatasource } from './login-datasource';

describe('LoginDatasource', () => {
  let provider: LoginDatasource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginDatasource],
    }).compile();

    provider = module.get<LoginDatasource>(LoginDatasource);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
