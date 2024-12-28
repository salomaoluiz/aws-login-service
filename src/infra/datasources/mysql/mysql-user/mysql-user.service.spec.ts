import { Test, TestingModule } from '@nestjs/testing';
import { MysqlUserService } from './mysql-user.service';
import { LoggerService } from '@infra/logger/logger.service';
import { User } from '@infra/datasources/entities/user/user';
import { getRepositoryToken } from '@nestjs/typeorm';

const loggerMock = {
  error: jest.fn(),
};

const userRepositoryMock = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
};

describe('MysqlUserService', () => {
  let service: MysqlUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MysqlUserService,
        { provide: LoggerService, useValue: loggerMock },
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MysqlUserService>(MysqlUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call find method', async () => {
    userRepositoryMock.find.mockResolvedValueOnce([]);
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should call findOneBy method', async () => {
    userRepositoryMock.findOneBy.mockResolvedValueOnce({});
    const result = await service.findById(1);
    expect(result).toEqual({});
  });

  it('should call delete method', async () => {
    userRepositoryMock.delete.mockResolvedValueOnce({});
    await service.deleteById(1);
    expect(userRepositoryMock.delete).toHaveBeenCalledWith({ id: 1 });
  });

  it('should call save method', async () => {
    userRepositoryMock.save.mockResolvedValueOnce({});
    const result = await service.createUser({ name: 'test' });
    expect(result).toEqual({});
  });

  it('should call error on find all users', async () => {
    const error = new Error('Something wrong in find all users');
    userRepositoryMock.find.mockRejectedValueOnce(error);
    const promise = service.findAll();

    await expect(promise).rejects.toEqual(error);
    expect(loggerMock.error).toHaveBeenCalledWith(
      'Error on find all users',
      error,
    );
  });

  it('should call error on find user by id', async () => {
    const error = new Error('Something wrong in find user by id');
    userRepositoryMock.findOneBy.mockRejectedValueOnce(error);

    const promise = service.findById(1);

    await expect(promise).rejects.toEqual(error);
    expect(loggerMock.error).toHaveBeenCalledWith(
      'Error on find user by id',
      error,
    );
  });

  it('should call error on delete user by id', async () => {
    const error = new Error('Something wrong in delete user by id');
    userRepositoryMock.delete.mockRejectedValueOnce(error);

    const promise = service.deleteById(1);

    await expect(promise).rejects.toEqual(error);
    expect(loggerMock.error).toHaveBeenCalledWith(
      'Error on delete user by id',
      error,
    );
  });

  it('should call error on create user', async () => {
    const error = new Error('Something wrong in create user');
    userRepositoryMock.save.mockRejectedValueOnce(error);

    const promise = service.createUser({ name: 'test', phone: '123' });

    await expect(promise).rejects.toEqual(error);
    expect(loggerMock.error).toHaveBeenCalledWith(
      'Error on create user',
      error,
    );
  });
});
