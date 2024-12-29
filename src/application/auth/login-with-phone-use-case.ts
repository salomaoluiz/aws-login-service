import { IUseCase } from '@application/use-case';
import { LoginDto } from '@presentation/auth/dto/login.dto';
import { LoginEntity } from '@presentation/auth/entities/login.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ILoginRepository from '@domain/repositories/auth/login-repository';
import IUserRepository from '@domain/repositories/auth/user-repository';

@Injectable()
export class LoginWithPhoneUseCase implements IUseCase<LoginDto, LoginEntity> {
  constructor(
    @Inject('ILoginRepository')
    private readonly authRepository: ILoginRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginEntity | null> {
    const [user] = await Promise.allSettled([
      this.authRepository.loginWithPhone({
        phoneNumber: dto.phoneNumber,
        uuid: dto.uuid,
      }),
    ]);

    if (user.status === 'fulfilled') {
      return {
        access_token: this.jwtService.sign(
          { id: user.value.id },
          { expiresIn: '1d' },
        ),
        refresh_token: this.jwtService.sign({ id: user.value.id }),
      };
    }

    if (
      user.status === 'rejected' &&
      (user.reason as HttpException).getStatus() === HttpStatus.CONFLICT
    ) {
      const confirmationCode = await this.authRepository.sendSMSCode(
        dto.phoneNumber,
      );

      const cause = (user.reason as HttpException).cause as { user_id: number };
      await this.userRepository.updateUser({
        id: cause.user_id,
        confirmationCode,
      });

      throw new HttpException(
        {
          message: 'Phone number need to be confirmed',
          user_id: cause.user_id,
        },
        HttpStatus.ACCEPTED,
      );
    }

    throw user.reason;
  }
}
