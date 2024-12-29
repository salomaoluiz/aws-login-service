import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '@application/use-case';
import { UpdateDto } from '@presentation/auth/dto/update.dto';
import IUserRepository from '@domain/repositories/auth/user-repository';
import ILoginRepository from '@domain/repositories/auth/login-repository';
import { HttpException, HttpStatus } from '@nestjs/common';

interface Input {
  userId: number;
  data: Partial<UpdateDto>;
}

@Injectable()
export class UpdateUserUseCase implements IUseCase<Input, void> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ILoginRepository')
    private readonly loginRepository: ILoginRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findById(input.userId);

    let confirmationCode = user.confirmationCode;
    const changedPhone =
      input.data.phoneNumber && user.phone !== input.data.phoneNumber;

    if (changedPhone) {
      confirmationCode = await this.loginRepository.sendSMSCode(
        input.data.phoneNumber,
      );
    }

    await this.userRepository.updateUser({
      id: input.userId,
      name: input.data.name,
      phone: input.data.phoneNumber,
      confirmationCode,
      isConfirmed: !changedPhone,
    });

    if (changedPhone) {
      throw new HttpException(
        'Phone number changed, confirm the new phone number',
        HttpStatus.ACCEPTED,
      );
    }
  }
}
