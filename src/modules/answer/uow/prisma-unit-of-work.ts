import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { AnswerRepository } from '../repositories/answer.repository';
import { PrismaAnswerRepository } from '../repositories/prisma-answer.repository';
import { LikeRepository } from '../resource/like/repositories/like.repository';
import { PrismaLikeRepository } from '../resource/like/repositories/prisma-like.repository';
import { UnitOfWork } from './unit-of-work';

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(private readonly prisma: PrismaService) {}
  execute<T>(
    operation: (
      repositories: {
        answerRepository: AnswerRepository;
        likeRepository: LikeRepository;
      },
      tx: unknown,
    ) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const answerRepository = new PrismaAnswerRepository(this.prisma);
      const likeRepository = new PrismaLikeRepository(this.prisma);

      return operation(
        {
          answerRepository,
          likeRepository,
        },
        tx,
      );
    });
  }
}
