import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  const authServiceMock = {
    login: jest.fn(),
  };
  const sendSpy = jest.fn();
  const jsonSpy = jest.fn().mockReturnValue({ send: sendSpy });
  const resMock = {
    status: jest.fn().mockReturnValue({
      json: jsonSpy,
    }),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should send with the status and body returned from the service's login method", async () => {
    const status = 200;
    const body = { access_token: 'token' };
    authServiceMock.login.mockResolvedValue({ status, body });

    await controller.login(
      {
        phoneNumber: '1234567890',
        uuid: 'cb352a89-fe45-4b0a-a4cc-87e4fc8dd67f',
      },
      resMock,
    );

    expect(authServiceMock.login).toHaveBeenCalledWith({
      phoneNumber: '1234567890',
      uuid: 'cb352a89-fe45-4b0a-a4cc-87e4fc8dd67f',
    });
    expect(resMock.status).toHaveBeenCalledWith(status);
    expect(jsonSpy).toHaveBeenCalledWith(body);
    expect(sendSpy).toHaveBeenCalledTimes(1);
  });
});
