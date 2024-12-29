import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@infra/config/config.service';
import IJwt from '@infra/jwt/jwt';

@Injectable()
export class NestJwt implements IJwt {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  sign(payload: any, options?: { expires_in: string }) {
    return this.jwtService.sign(payload, {
      secret: this.config.JWT_SECRET,
      expiresIn: options?.expires_in || this.config.JWT_EXPIRES_IN,
    });
  }

  verify(token: string) {
    return this.jwtService.verify(token, {
      secret: this.config.JWT_SECRET,
    });
  }
}
