import {
  CanActivate,
  Inject,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import IJwt from '@infra/jwt/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IJwt')
    private readonly jwtService: IJwt,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new HttpException('not-authorized', HttpStatus.UNAUTHORIZED);
    }

    const [bearer, tokenValue] = token.split(' ');

    if (bearer !== 'Bearer' || !tokenValue) {
      throw new HttpException('not-authorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const isValid = this.jwtService.verify(tokenValue);

      return !!isValid;
    } catch (error) {
      throw new HttpException('not-authorized', HttpStatus.UNAUTHORIZED, {
        cause: error,
      });
    }
  }
}
