import { Test, TestingModule } from '@nestjs/testing';
import { LoginRepository } from './login-repository';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('LoginRepository', () => {
  let provider: LoginRepository;
  const loginDatasourceMock = {
    sendSMS: jest.fn(),
  };
  const userDatasourceMock = {
    findByPhoneNumber: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginRepository,
        { provide: 'ILoginDatasource', useValue: loginDatasourceMock },
        { provide: 'IUserDatasource', useValue: userDatasourceMock },
      ],
    }).compile();

    provider = module.get<LoginRepository>(LoginRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should send SMS code', async () => {
    const phoneNumber = '1234567890';
    const smsCode = '123456';
    loginDatasourceMock.sendSMS.mockReturnValueOnce(smsCode);

    const result = await provider.sendSMSCode(phoneNumber);

    expect(result).toBe(smsCode);
  });

  it('should login with phone', async () => {
    const phoneNumber = '1234567890';
    const uuid = '123456';
    const userModel = {
      id: 1,
      name: 'John Doe',
      phone: phoneNumber,
      uuid,
      isConfirmed: true,
    };
    userDatasourceMock.findByPhoneNumber.mockReturnValueOnce(userModel);

    const result = await provider.loginWithPhone({ phoneNumber, uuid });

    expect(result).toEqual({
      id: userModel.id,
      name: userModel.name,
      phone: userModel.phone,
      uuid: userModel.uuid,
      isConfirmed: userModel.isConfirmed,
    });
  });

  it('should throw error when user not found', async () => {
    const phoneNumber = '1234567890';
    const uuid = '123456';
    const error = new HttpException('user-not-found', HttpStatus.NOT_FOUND);
    userDatasourceMock.findByPhoneNumber.mockReturnValueOnce(null);

    await expect(
      provider.loginWithPhone({ phoneNumber, uuid }),
    ).rejects.toThrow(error);
  });

  it('should throw error when user uuid not match', async () => {
    const phoneNumber = '1234567890';
    const uuid = '123456';
    const userModel = {
      id: 1,
      name: 'John Doe',
      phone: phoneNumber,
      uuid: '654321',
      isConfirmed: true,
    };
    userDatasourceMock.findByPhoneNumber.mockReturnValueOnce(userModel);
    const error = new HttpException('user-not-match', HttpStatus.CONFLICT, {
      cause: { user_id: userModel.id },
    });

    await expect(
      provider.loginWithPhone({ phoneNumber, uuid }),
    ).rejects.toThrow(error);
  });

  it('should throw error when phone not confirmed', async () => {
    const phoneNumber = '1234567890';
    const uuid = '123456';
    const userModel = {
      id: 1,
      name: 'John Doe',
      phone: phoneNumber,
      uuid,
      isConfirmed: false,
    };
    const error = new HttpException(
      'phone-not-confirmed',
      HttpStatus.UNAUTHORIZED,
      {
        cause: { user_id: userModel.id },
      },
    );
    userDatasourceMock.findByPhoneNumber.mockReturnValueOnce(userModel);

    await expect(
      provider.loginWithPhone({ phoneNumber, uuid }),
    ).rejects.toThrow(error);
  });
});
