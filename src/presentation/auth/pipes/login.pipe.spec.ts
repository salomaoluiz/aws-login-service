import { LoginPipe } from './login.pipe';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthPipe', () => {
  it('should be defined', () => {
    expect(new LoginPipe()).toBeDefined();
  });

  it('should validate phone number', () => {
    const loginWithPhoneDto = {
      phoneNumber: '5544911112222',
      uuid: '123e4567-e89b-12d3-a456-426614174000',
    };

    const pipe = new LoginPipe();

    expect(pipe.transform(loginWithPhoneDto)).toBeTruthy();
  });

  it('should validate uuid', () => {
    const loginWithPhoneDto = {
      phoneNumber: '5544911112222',
      uuid: '123e4567-e891-12d3-a456-426614174000',
    };

    const pipe = new LoginPipe();

    expect(pipe.transform(loginWithPhoneDto)).toBeTruthy();
  });

  it('should throw an exception when phone number is invalid', () => {
    const loginWithPhoneDto = {
      phoneNumber: '123',
      uuid: '123e4567-e892-12d3-a456-426614174000',
    };

    const pipe = new LoginPipe();

    expect(() => pipe.transform(loginWithPhoneDto)).toThrow(
      new HttpException(
        "Invalid phone number, follow the pattern '5544911112222'",
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should throw an exception when uuid is invalid', () => {
    const loginWithPhoneDto = {
      phoneNumber: '5544911112222',
      uuid: '1123',
    };

    const pipe = new LoginPipe();

    expect(() => pipe.transform(loginWithPhoneDto)).toThrow(
      new HttpException('Invalid uuid', HttpStatus.BAD_REQUEST),
    );
  });
});
