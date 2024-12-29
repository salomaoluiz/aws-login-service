import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmUserPhoneUseCase } from './confirm-user-phone-use-case';

describe('ConfirmUserPhoneUseCase', () => {
  let provider: ConfirmUserPhoneUseCase;
  const userRepositoryMock = {
    findByPhoneNumber: jest.fn(),
    updateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfirmUserPhoneUseCase,
        {
          provide: 'IUserRepository',
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    provider = module.get<ConfirmUserPhoneUseCase>(ConfirmUserPhoneUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
