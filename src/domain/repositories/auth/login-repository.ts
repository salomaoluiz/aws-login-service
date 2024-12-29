import UserEntity from '@domain/entities/user';

interface ILoginRepository {
  loginWithPhone(props: {
    phoneNumber: string;
    uuid: string;
  }): Promise<UserEntity>;

  sendSMSCode(phoneNumber: string): Promise<string>;
}

export default ILoginRepository;
