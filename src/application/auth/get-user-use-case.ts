import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '@application/use-case';
import UserEntity from '@domain/entities/user';
import IUserRepository from '@domain/repositories/auth/user-repository';

@Injectable()
export class GetUserUseCase implements IUseCase<number, UserEntity> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: number): Promise<UserEntity> {
    return await this.userRepository.findById(userId);
  }
}
