import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import IJwt from '@infra/jwt/jwt';

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
      request.user = this.jwtService.verify(tokenValue);
      return true;
    } catch (error) {
      throw new HttpException('not-authorized', HttpStatus.UNAUTHORIZED, {
        cause: error,
      });
    }
  }
}
