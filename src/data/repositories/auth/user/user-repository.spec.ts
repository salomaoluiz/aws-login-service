import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user-repository';
import IUserDatasource from '@data/repositories/auth/user/user-datasource';
import UserEntity from '@domain/entities/user';

describe('UserRepository', () => {
  let provider: UserRepository;
  const userDataSource: jest.Mocked<IUserDatasource> = {
    findByPhoneNumber: jest.fn(),
    findById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: 'IUserDatasource',
          useValue: userDataSource,
        },
      ],
    }).compile();

    provider = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should call userDataSource.findById AND return null IF user is not found', async () => {
    const id = 1;
    userDataSource.findById.mockResolvedValue(null);

    const result = await provider.findById(id);

    expect(result).toBeNull();
    expect(userDataSource.findById).toHaveBeenCalledWith(id);
  });

  it('should call userDataSource.findById AND return UserEntity IF user is found', async () => {
    const user = {
      id: 1,
      name: 'name',
      phone: '123456789',
      uuid: '6d108074-0317-4136-9e13-a8bc247355b4',
    };
    userDataSource.findById.mockResolvedValue(user);

    const result = await provider.findById(user.id);

    expect(result).toEqual(
      new UserEntity(user.id, user.name, user.phone, user.uuid),
    );
    expect(userDataSource.findById).toHaveBeenCalledWith(user.id);
  });

  it('should call userDataSource.createUser', async () => {
    const user = {
      id: 1,
      name: 'name',
      phone: '123456789',
      uuid: '6d108074-0317-4136-9e13-a8bc247355b4',
    };
    userDataSource.createUser.mockResolvedValue(user);

    const result = await provider.createUser({
      phoneNumber: user.phone,
      uuid: user.uuid,
    });

    expect(result).toEqual(
      new UserEntity(user.id, user.name, user.phone, user.uuid),
    );
    expect(userDataSource.createUser).toHaveBeenCalledWith({
      phone: user.phone,
      uuid: user.uuid,
    });
  });

  it('should call userDataSource.updateUser', async () => {
    const user = { id: 1, name: 'name', phone: '123456789', uuid: 'uuid' };
    userDataSource.updateUser.mockResolvedValue(user);

    const result = await provider.updateUser(user);

    expect(result).toEqual(
      new UserEntity(user.id, user.name, user.phone, user.uuid),
    );
    expect(userDataSource.updateUser).toHaveBeenCalledWith(user);
  });
});
