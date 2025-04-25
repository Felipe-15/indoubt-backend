import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma.service';
import { HypeRepository } from '../resource/hype/repositories/hype.repository';
import { PrismaHypeRepository } from '../resource/hype/repositories/prisma-hype.repository';
import { PrismaQuestionRepository } from '../repositories/prisma-question.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { UnitOfWork } from './unit-of-work';

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(private prisma: PrismaService) {}

  async execute<T>(
    operation: (
      repositories: {
        questionRepository: QuestionRepository;
        hypeRepository: HypeRepository;
      },
      tx: Prisma.TransactionClient,
    ) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const questionRepository = new PrismaQuestionRepository(this.prisma);
      const hypeRepository = new PrismaHypeRepository(this.prisma);

      return operation({ questionRepository, hypeRepository }, tx);
    });
  }
}
