import { Test, TestingModule } from '@nestjs/testing';
import { UserDatasource } from './user-datasource';
import { MysqlUser } from '@infra/datasources/mysql/mysql-user/mysql-user';
import UserModel from '@data/models/user/user-model';

describe('User', () => {
  const mysqlUserRepositoryMock = {
    findById: jest.fn(),
    findByPhoneNumber: jest.fn(),
    createUser: jest.fn(),
    update: jest.fn(),
  };

  let provider: UserDatasource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MysqlUser,
          useValue: mysqlUserRepositoryMock,
        },
        UserDatasource,
      ],
    }).compile();

    provider = module.get<UserDatasource>(UserDatasource);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should call findById', async () => {
    const id = 1;
    await provider.findById(id);

    expect(mysqlUserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(mysqlUserRepositoryMock.findById).toHaveBeenCalledWith(id);
  });

  it('should call findByPhoneNumber', async () => {
    const phoneNumber = '123';
    await provider.findByPhoneNumber(phoneNumber);

    expect(mysqlUserRepositoryMock.findByPhoneNumber).toHaveBeenCalledTimes(1);
    expect(mysqlUserRepositoryMock.findByPhoneNumber).toHaveBeenCalledWith(
      phoneNumber,
    );
  });

  it('should call createUser', async () => {
    const user = {
      phone: '5544987961234',
      uuid: '16e57b6a-2067-4b51-b007-9e7baf3d4221',
    };
    mysqlUserRepositoryMock.createUser.mockResolvedValueOnce({
      id: 1,
      ...user,
    });

    const result = await provider.createUser(user);

    expect(result).toEqual(UserModel.fromJson({ id: 1, ...user }));
    expect(mysqlUserRepositoryMock.createUser).toHaveBeenCalledTimes(1);
    expect(mysqlUserRepositoryMock.createUser).toHaveBeenCalledWith(user);
  });

  it('should call updateUser', async () => {
    const user = {
      phone: '5544987961234',
      uuid: '16e57b6a-2067-4b51-b007-9e7baf3d4221',
    };
    mysqlUserRepositoryMock.update.mockResolvedValueOnce({
      id: 1,
      ...user,
    });

    const result = await provider.updateUser(user);

    expect(result).toEqual(UserModel.fromJson({ id: 1, ...user }));
    expect(mysqlUserRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(mysqlUserRepositoryMock.update).toHaveBeenCalledWith({
      phone: user.phone,
      uuid: user.uuid,
    });
  });
});
