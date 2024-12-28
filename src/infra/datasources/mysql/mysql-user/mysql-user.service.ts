import { Injectable } from '@nestjs/common';
import { LoggerService } from '@infra/logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@infra/datasources/entities/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class MysqlUserService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error('Error on find all users', error);
      throw error;
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error('Error on find user by id', error);
      throw error;
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.userRepository.delete({ id });
    } catch (error) {
      this.logger.error('Error on delete user by id', error);
      throw error;
    }
  }

  async createUser(user: Partial<User>): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Error on create user', error);
      throw error;
    }
  }
}
