import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithPhoneUseCase } from '@application/auth/login-with-phone-use-case';
import { LoginDto } from '@presentation/auth/dto/login.dto';
import { UpdateUserUseCase } from '@application/auth/update-user-use-case';
import { GetUserUseCase } from '@application/auth/get-user-use-case';
import { ConfirmUserPhoneUseCase } from '@application/auth/confirm-user-phone-use-case';

describe('AuthService', () => {
  let service: AuthService;
  const loginWithPhoneUseCase = { execute: jest.fn() };
  const confirmUserPhoneUseCase = { execute: jest.fn() };
  const getUserUseCase = { execute: jest.fn() };
  const updateUserUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: LoginWithPhoneUseCase,
          useValue: loginWithPhoneUseCase,
        },
        {
          provide: ConfirmUserPhoneUseCase,
          useValue: confirmUserPhoneUseCase,
        },
        {
          provide: UpdateUserUseCase,
          useValue: updateUserUseCase,
        },
        {
          provide: GetUserUseCase,
          useValue: getUserUseCase,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return status 200 and body when login is successful', async () => {
    const loginDto: LoginDto = {
      phoneNumber: '123456789',
      uuid: '9c08caab-8677-4a9e-a82a-b978ade10f28',
    };
    const entity = {
      id: 1,
      phone: '123456789',
    };
    loginWithPhoneUseCase.execute.mockReturnValue(entity);

    const result = await service.login(loginDto);

    expect(result).toEqual({
      status: 200,
      body: entity,
    });
  });

  it('should return status 202 and body null when login is successful', async () => {
    const loginDto: LoginDto = {
      phoneNumber: '123456789',
      uuid: '9c08caab-8677-4a9e-a82a-b978ade10f28',
    };
    const error = new HttpException(
      'Phone number is not confirmed',
      HttpStatus.ACCEPTED,
    );

    loginWithPhoneUseCase.execute.mockRejectedValue(error);

    const result = await service.login(loginDto);

    expect(result).toEqual({
      status: 202,
      body: 'Phone number is not confirmed',
    });
  });

  it('should throw error when login is unsuccessful', async () => {
    const loginDto: LoginDto = {
      phoneNumber: '123456789',
      uuid: '9c08caab-8677-4a9e-a82a-b978ade10f28',
    };
    const error = new Error('Internal Server Error');
    loginWithPhoneUseCase.execute.mockRejectedValue(error);

    await expect(service.login(loginDto)).rejects.toThrow(error);
  });
});
