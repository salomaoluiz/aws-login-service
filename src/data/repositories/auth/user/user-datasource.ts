import UserModel from '@data/models/user/user-model';

interface IUserDatasource {
  findById(id: number): Promise<UserModel | null>;
  findByPhoneNumber(phoneNumber: string): Promise<UserModel | null>;
  createUser(props: Partial<UserModel>): Promise<Partial<UserModel>>;
  updateUser(user: Partial<UserModel>): Promise<Partial<UserModel>>;
}

export default IUserDatasource;
