import { IUseCase } from '@application/use-case';
import { LoginDto } from '@presentation/auth/dto/login.dto';
import { LoginEntity } from '@presentation/auth/entities/login.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import ILoginRepository from '@domain/repositories/auth/login-repository';
import IUserRepository from '@domain/repositories/auth/user-repository';
import IJwt from '@infra/jwt/jwt';

@Injectable()
export class LoginWithPhoneUseCase implements IUseCase<LoginDto, LoginEntity> {
  constructor(
    @Inject('ILoginRepository')
    private readonly authRepository: ILoginRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IJwt')
    private readonly jwtService: IJwt,
  ) {}

  _handleNotFound = async (dto: LoginDto) => {
    const confirmationCode = await this.authRepository.sendSMSCode(
      dto.phoneNumber,
    );

    const user = await this.userRepository.createUser({
      phoneNumber: dto.phoneNumber,
      uuid: dto.uuid,
      confirmationCode,
    });

    throw new HttpException(
      {
        message: 'User created, but you need to confirm your phone number',
        user_id: user.id,
      },
      HttpStatus.ACCEPTED,
    );
  };

  _handleUnauthorized = async (dto: LoginDto, cause: { user_id: number }) => {
    const confirmationCode = await this.authRepository.sendSMSCode(
      dto.phoneNumber,
    );

    await this.userRepository.updateUser({
      id: cause.user_id,
      confirmationCode,
    });

    throw new HttpException(
      {
        message: 'Phone number not confirmed',
      },
      HttpStatus.ACCEPTED,
    );
  };

  _handleConflict = async (dto: LoginDto, cause: { user_id: number }) => {
    const confirmationCode = await this.authRepository.sendSMSCode(
      dto.phoneNumber,
    );

    await this.userRepository.updateUser({
      id: cause.user_id,
      confirmationCode,
    });

    throw new HttpException(
      {
        message:
          'This user already exists, but you need to confirm your phone number',
      },
      HttpStatus.ACCEPTED,
    );
  };

  async execute(dto: LoginDto): Promise<LoginEntity | null> {
    const [user] = await Promise.allSettled([
      this.authRepository.loginWithPhone({
        phoneNumber: dto.phoneNumber,
        uuid: dto.uuid,
      }),
    ]);

    if (user.status === 'fulfilled') {
      return {
        access_token: this.jwtService.sign({ user_id: user.value.id }),
        refresh_token: this.jwtService.sign(
          { user_id: user.value.id },
          { expires_in: '7d' },
        ),
      };
    }

    if (user.status === 'rejected') {
      const status = (user.reason as HttpException).getStatus();
      const cause = (user.reason as HttpException).cause as {
        user_id: number;
      };

      switch (status) {
        case HttpStatus.UNAUTHORIZED:
          await this._handleUnauthorized(dto, cause);
          break;
        case HttpStatus.NOT_FOUND:
          await this._handleNotFound(dto);
          break;
        case HttpStatus.CONFLICT:
          await this._handleConflict(dto, cause);
          break;
        default:
          throw user;
      }
    }
  }
}
