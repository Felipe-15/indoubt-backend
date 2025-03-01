import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Encryptor } from 'src/interfaces/encryptor.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private encryptor: Encryptor,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.user({ email: username });
    const samePassword = await this.encryptor.compare(
      password,
      user?.password || '',
    );
    if (!user || !samePassword) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async register(data: Pick<User, 'email' | 'name' | 'password'>) {
    if (data.password) {
      data.password = await this.encryptor.hash(data.password);
    }
    return this.usersService.createUser({ ...data });
  }
}
