import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user-repository';
import IUserDatasource from '@data/repositories/auth/user/user-datasource';
import UserEntity from '@domain/entities/user';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  it('should call userDataSource.findById AND return throw IF user is not found', async () => {
    const id = 1;
    const error = new HttpException('User not found', HttpStatus.NOT_FOUND);

    userDataSource.findById.mockResolvedValue(null);

    const result = provider.findById(id);

    expect(userDataSource.findById).toHaveBeenCalledWith(id);
    expect(result).rejects.toThrow(error);
  });

  it('should call userDataSource.findById AND return UserEntity IF user is found', async () => {
    const user = {
      id: 1,
      name: 'name',
      phone: '123456789',
      uuid: '6d108074-0317-4136-9e13-a8bc247355b4',
      confirmationCode: '123456',
      isConfirmed: false,
    };
    userDataSource.findById.mockResolvedValue(user);

    const result = await provider.findById(user.id);

    expect(result).toEqual(
      new UserEntity({
        id: user.id,
        name: user.name,
        phone: user.phone,
        uuid: user.uuid,
        confirmationCode: user.confirmationCode,
        isConfirmed: user.isConfirmed,
      }),
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
      confirmationCode: '123456',
    });

    expect(result).toEqual(
      new UserEntity({
        id: user.id,
        name: user.name,
        phone: user.phone,
        uuid: user.uuid,
      }),
    );
    expect(userDataSource.createUser).toHaveBeenCalledWith({
      phone: user.phone,
      uuid: user.uuid,
      confirmationCode: '123456',
    });
  });

  it('should call userDataSource.updateUser', async () => {
    const user = { id: 1, name: 'name', phone: '123456789', uuid: 'uuid' };
    userDataSource.updateUser.mockResolvedValue(user);

    const result = await provider.updateUser(user);

    expect(result).toEqual(
      new UserEntity({
        id: user.id,
        name: user.name,
        phone: user.phone,
        uuid: user.uuid,
      }),
    );
    expect(userDataSource.updateUser).toHaveBeenCalledWith(user);
  });
});
