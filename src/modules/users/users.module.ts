import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/libs/prisma.service';

@Module({
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
