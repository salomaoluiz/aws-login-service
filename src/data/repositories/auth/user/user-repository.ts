import { Inject, Injectable } from '@nestjs/common';
import IUserRepository from '@domain/repositories/auth/user-repository';
import UserEntity from '@domain/entities/user';
import IUserDatasource from '@data/repositories/auth/user/user-datasource';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('IUserDatasource')
    private readonly userDatasource: IUserDatasource,
  ) {}

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.userDatasource.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      phone: user.phone,
      uuid: user.uuid,
      isConfirmed: user.isConfirmed,
      confirmationCode: user.confirmationCode,
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UserEntity | null> {
    const user = await this.userDatasource.findByPhoneNumber(phoneNumber);

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      phone: user.phone,
      uuid: user.uuid,
      isConfirmed: user.isConfirmed,
      confirmationCode: user.confirmationCode,
    });
  }

  async createUser(props: {
    phoneNumber: string;
    uuid: string;
    confirmationCode: string;
  }): Promise<Partial<UserEntity>> {
    const user = await this.userDatasource.createUser({
      phone: props.phoneNumber,
      uuid: props.uuid,
      confirmationCode: props.confirmationCode,
    });

    return new UserEntity({
      id: user.id,
      name: user.name,
      phone: user.phone,
      uuid: user.uuid,
      isConfirmed: user.isConfirmed,
      confirmationCode: user.confirmationCode,
    });
  }

  async updateUser(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    const updatedUser = await this.userDatasource.updateUser(user);

    return new UserEntity({
      id: updatedUser.id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      uuid: updatedUser.uuid,
      isConfirmed: updatedUser.isConfirmed,
      confirmationCode: updatedUser.confirmationCode,
    });
  }
}
