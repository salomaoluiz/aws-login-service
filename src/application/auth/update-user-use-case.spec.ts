import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update-user-use-case';

describe('UpdateUserUseCase', () => {
  let provider: UpdateUserUseCase;
  const userRepositoryMock = {
    findById: jest.fn(),
    updateUser: jest.fn(),
  };
  const loginRepositoryMock = {
    sendSMSCode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: userRepositoryMock,
        },
        {
          provide: 'ILoginRepository',
          useValue: loginRepositoryMock,
        },
      ],
    }).compile();

    provider = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
