import { User } from 'src/entities/user.entity';
import {
  UserWhereUnique,
  UserCreate,
  UserUpdate,
  UserFilters,
} from '../dtos/user.dto';

export abstract class UserRepository {
  abstract findUnique(where: UserWhereUnique): Promise<User | null>;
  abstract findMany(filters: UserFilters): Promise<User[]>;
  abstract create(data: UserCreate): Promise<User>;
  abstract update(
    where: UserWhereUnique,
    data: UserUpdate['data'],
  ): Promise<User>;
}
