import { Module } from '@nestjs/common';
import { BcryptAdapter } from 'src/adapters/bcrypt.adapter';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Encryptor } from 'src/interfaces/encryptor.interface';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    UsersService,
    {
      provide: Encryptor,
      useClass: BcryptAdapter,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
