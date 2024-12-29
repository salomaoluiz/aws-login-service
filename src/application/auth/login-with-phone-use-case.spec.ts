import { Test, TestingModule } from '@nestjs/testing';
import { LoginWithPhoneUseCase } from './login-with-phone-use-case';
import { JwtService } from '@nestjs/jwt';
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

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginWithPhoneUseCase,
        { provide: 'ILoginRepository', useValue: authRepository },
        { provide: JwtService, useValue: jwtService },
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
    const error = new HttpException('Conflict', 409);
    authRepository.loginWithPhone.mockRejectedValue(error);
    authRepository.sendSMSCode.mockResolvedValue(null);

    const result = await provider.execute(dto);

    expect(result).toBeNull();
  });

  it('should throw an error', async () => {
    const dto = { phoneNumber: '123456789', uuid: 'uuid' };
    const error = new HttpException('Internal Server Error', 500);
    authRepository.loginWithPhone.mockRejectedValue(error);

    await expect(provider.execute(dto)).rejects.toThrow(error);
  });
});
