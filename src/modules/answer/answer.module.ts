import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/libs/prisma.service';
import { AnswerRepository } from './repositories/answer.repository';
import { PrismaAnswerRepository } from './repositories/prisma-answer.repository';
import { UnitOfWork } from './uow/unit-of-work';
import { PrismaUnitOfWork } from './uow/prisma-unit-of-work';

@Module({
  controllers: [AnswerController],
  providers: [
    AnswerService,
    JwtService,
    PrismaService,
    { provide: AnswerRepository, useClass: PrismaAnswerRepository },
    { provide: UnitOfWork, useClass: PrismaUnitOfWork },
  ],
})
export class AnswerModule {}
