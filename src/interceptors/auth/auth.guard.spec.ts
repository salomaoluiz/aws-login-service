import { AuthGuard } from './auth.guard';
import IJwt from '@infra/jwt/jwt';

describe('AuthGuard', () => {
  const jwtService = {
    verify: jest.fn(),
    sign: jest.fn(),
  } as IJwt;

  it('should be defined', () => {
    expect(new AuthGuard(jwtService)).toBeDefined();
  });
});
