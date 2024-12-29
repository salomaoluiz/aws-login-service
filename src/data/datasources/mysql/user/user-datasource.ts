import { Injectable } from '@nestjs/common';
import IUserDatasource from '@data/repositories/auth/user/user-datasource';
import UserModel from '@data/models/user/user-model';
import { MysqlUser } from '@infra/datasources/mysql/mysql-user/mysql-user';
import { User } from '@infra/datasources/entities/user/user';

@Injectable()
export class UserDatasource implements IUserDatasource {
  constructor(private readonly mysqlUserRepository: MysqlUser) {}

  async findById(id: number): Promise<UserModel | null> {
    const user = await this.mysqlUserRepository.findById(id);

    if (!user) {
      return null;
    }

    return UserModel.fromJson(user);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UserModel | null> {
    const user = await this.mysqlUserRepository.findByPhoneNumber(phoneNumber);

    if (!user) {
      return null;
    }

    return UserModel.fromJson(user);
  }

  async createUser(props: {
    phone: string;
    uuid: string;
  }): Promise<Partial<UserModel>> {
    const newUser = new User();

    newUser.phone = props.phone;
    newUser.uuid = props.uuid;

    const userCreated = await this.mysqlUserRepository.createUser(newUser);

    return UserModel.fromJson(userCreated);
  }

  async updateUser(user: Partial<UserModel>): Promise<Partial<UserModel>> {
    const userToUpdate = new User();

    userToUpdate.phone = user.phone;
    userToUpdate.uuid = user.uuid;
    userToUpdate.name = user.name;
    userToUpdate.id = user.id;

    const userUpdated = await this.mysqlUserRepository.update(userToUpdate);
    return UserModel.fromJson(userUpdated);
  }
}
