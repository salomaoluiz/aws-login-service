import { Test, TestingModule } from '@nestjs/testing';
import { LoginWithPhoneUseCase } from './login-with-phone-use-case';
import { HttpException } from '@nestjs/common';

describe('LoginWithPhoneUseCase', () => {
  let provider: LoginWithPhoneUseCase;
  const jwtService = {
    sign: jest.fn(),
  };
  const authRepository = {
    loginWithPhone: jest.fn(),
    sendSMSCode: jest.fn(),
  };
  const userRepositoryMock = {
    updateUser: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginWithPhoneUseCase,
        { provide: 'ILoginRepository', useValue: authRepository },
        { provide: 'IUserRepository', useValue: userRepositoryMock },
        { provide: 'IJwt', useValue: jwtService },
      ],
    }).compile();

    provider = module.get<LoginWithPhoneUseCase>(LoginWithPhoneUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should return access_token and refresh_token', async () => {
    const dto = { phoneNumber: '123456789', uuid: 'uuid' };
    const user = { id: 1 };
    const jwt = {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    };
    authRepository.loginWithPhone.mockResolvedValue(user);
    jwtService.sign
      .mockReturnValueOnce(jwt.access_token)
      .mockReturnValueOnce(jwt.refresh_token);

    const result = await provider.execute(dto);

    expect(result).toEqual({ ...jwt });
  });

  it('should return null', async () => {
    const dto = { phoneNumber: '123456789', uuid: 'uuid' };
    const error = new HttpException(
      'This user already exists, but you need to confirm your phone number',
      409,
      { cause: { user_id: 1 } },
    );
    authRepository.loginWithPhone.mockRejectedValue(error);
    authRepository.sendSMSCode.mockResolvedValue(null);

    const result = provider.execute(dto);

    await expect(result).rejects.toThrow(error);
  });

  it('should throw an error', async () => {
    const dto = { phoneNumber: '123456789', uuid: 'uuid' };
    const error = new HttpException('Internal Server Error', 500);
    authRepository.loginWithPhone.mockRejectedValue(error);

    await expect(provider.execute(dto)).rejects.toThrow(error);
  });
});
