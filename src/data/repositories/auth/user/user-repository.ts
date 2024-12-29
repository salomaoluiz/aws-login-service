import { Inject, Injectable } from '@nestjs/common';
import IUserRepository from '@domain/repositories/auth/user-repository';
import UserEntity from '@domain/entities/user';
import IUserDatasource from '@data/repositories/auth/user/user-datasource';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('IUserDatasource')
    private readonly userDatasource: IUserDatasource,
  ) {}

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.userDatasource.findById(id);

    if (!user) {
      return null;
    }

    return new UserEntity(user.id, user.name, user.phone, user.uuid);
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

    return new UserEntity(user.id, user.name, user.phone, user.uuid);
  }

  async updateUser(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    const updatedUser = await this.userDatasource.updateUser(user);

    return new UserEntity(
      updatedUser.id,
      updatedUser.name,
      updatedUser.phone,
      updatedUser.uuid,
    );
  }
}
