import { Test, TestingModule } from '@nestjs/testing';
import { LoginDatasource } from './login-datasource';

describe('LoginDatasource', () => {
  let provider: LoginDatasource;
  const ISMSSenderMock = {
    sendSMS: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginDatasource,
        {
          provide: 'ISMSSender',
          useValue: ISMSSenderMock,
        },
      ],
    }).compile();

    provider = module.get<LoginDatasource>(LoginDatasource);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
