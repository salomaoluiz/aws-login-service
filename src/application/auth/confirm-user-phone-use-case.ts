import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '@application/use-case';
import { ConfirmDto } from '@presentation/auth/dto/confirm.dto';
import IUserRepository from '@domain/repositories/auth/user-repository';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ConfirmUserPhoneUseCase implements IUseCase<ConfirmDto, void> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: ConfirmDto): Promise<void> {
    const user = await this.userRepository.findByPhoneNumber(input.phoneNumber);

    if (!user) {
      throw new HttpException('user-not-found', HttpStatus.NOT_FOUND);
    }

    if (user.isConfirmed) {
      return;
    }

    if (user.confirmationCode === input.confirmationCode) {
      await this.userRepository.updateUser({ ...user, isConfirmed: true });
      return;
    }

    throw new HttpException(
      'invalid-confirmation-code',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
