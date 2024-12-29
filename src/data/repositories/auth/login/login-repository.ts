import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import ILoginDatasource from '@data/repositories/auth/login/login-datasource';
import UserEntity from '@domain/entities/user';
import ILoginRepository from '@domain/repositories/auth/login-repository';
import IUserDatasource from '@data/repositories/auth/user/user-datasource';

@Injectable()
export class LoginRepository implements ILoginRepository {
  constructor(
    @Inject('ILoginDatasource')
    private readonly loginDatasource: ILoginDatasource,
    @Inject('IUserDatasource')
    private readonly userDatasource: IUserDatasource,
  ) {}

  async loginWithPhone(props: {
    phoneNumber: string;
    uuid: string;
  }): Promise<UserEntity> {
    const userModel = await this.userDatasource.findByPhoneNumber(
      props.phoneNumber,
    );

    if (userModel === null) {
      throw new HttpException('user-not-found', HttpStatus.NOT_FOUND);
    }

    if (userModel?.uuid !== props.uuid) {
      throw new HttpException('user-not-match', HttpStatus.CONFLICT, {
        cause: { user_id: userModel.id },
      });
    }

    if (userModel.isConfirmed === false) {
      throw new HttpException('phone-not-confirmed', HttpStatus.UNAUTHORIZED, {
        cause: { user_id: userModel.id },
      });
    }

    return new UserEntity(
      userModel.id,
      userModel.name,
      userModel.phone,
      userModel.uuid,
      userModel.isConfirmed,
    );
  }

  async sendSMSCode(phoneNumber: string): Promise<string> {
    return await this.loginDatasource.sendSMS(phoneNumber);
  }
}
