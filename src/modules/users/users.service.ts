import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import {
  UserCreate,
  UserFilters,
  UserUpdate,
  UserWhereUnique,
} from './dtos/user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async user(userWhereUnique: UserWhereUnique): Promise<User | null> {
    return this.userRepository.findUnique(userWhereUnique);
  }

  async users(params: UserFilters): Promise<User[]> {
    return this.userRepository.findMany(params);
  }

  async createUser(data: UserCreate): Promise<User> {
    return this.userRepository.create(data);
  }

  async updateUser(params: UserUpdate): Promise<User> {
    const { where, data } = params;
    return this.userRepository.update(where, data);
  }
}
