import UserEntity from '@domain/entities/user';

interface IUserRepository {
  findById(id: number): Promise<UserEntity | null>;
  createUser(props: {
    phoneNumber: string;
    uuid: string;
    confirmationCode: string;
  }): Promise<Partial<UserEntity>>;
  updateUser(user: Partial<UserEntity>): Promise<Partial<UserEntity>>;
}

export default IUserRepository;
