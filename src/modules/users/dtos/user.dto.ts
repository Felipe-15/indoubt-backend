import { User } from 'src/entities/user.entity';

export type UserWhereUnique = { id?: string; email?: string };
export type UserCreate = { name: string; email: string; password?: string };
export type UserUpdate = {
  where: UserWhereUnique;
  data: { name?: string; email?: string; password?: string };
};
export type UserFilters = {
  skip?: number;
  take?: number;
  cursor?: UserWhereUnique;
  where?: Partial<User>;
  orderBy?: Record<string, 'asc' | 'desc'>;
};
