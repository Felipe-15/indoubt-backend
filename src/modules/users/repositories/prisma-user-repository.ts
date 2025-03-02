import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import {
  UserWhereUnique,
  UserCreate,
  UserUpdate,
  UserFilters,
} from '../dtos/user.dto';
import { PrismaService } from 'src/libs/prisma.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: UserWhereUnique): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: where.email, id: where.id },
    });
    return (user as User) || null;
  }

  async findMany(filters: UserFilters): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      skip: filters.skip,
      take: filters.take,
      cursor: { id: filters.cursor?.id, email: filters.cursor?.email },
      where: filters.where,
      orderBy: filters.orderBy,
    });

    return users as User[];
  }

  async create(data: UserCreate): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return user as User;
  }

  async update(
    where: UserWhereUnique,
    data: UserUpdate['data'],
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: where.id, email: where.email },
      data,
    });
    return user as User;
  }
}
