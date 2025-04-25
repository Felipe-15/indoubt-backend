import { PrismaService } from 'src/libs/prisma.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question } from '../entities/question.entity';
import { QuestionRepository } from './question.repository';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateQuestionDto & { ownerId: string },
  ): Promise<Question> {
    const question = await this.prisma.question.create({
      data,
    });

    return question as Question;
  }

  async findAll(
    pagination: number = 0,
    pageSize: number = 15,
  ): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      skip: pagination * pageSize,
      take: pageSize,
    });

    return questions as Question[];
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    return question as Question;
  }

  async update(
    questionId: string,
    userId: string,
    data: UpdateQuestionDto,
  ): Promise<Question> {
    const originalQuestion = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    const protectedFields = ['content', 'scholarship', 'subject'];
    if (
      Object.keys(data).some((key) => protectedFields.includes(key)) &&
      originalQuestion?.ownerId !== userId
    ) {
      throw new UnauthorizedException('You are not allowed to update!');
    }

    const question = await this.prisma.question.update({
      where: {
        id: questionId,
      },
      data,
    });

    return question as Question;
  }

  async delete(
    id: string,
    userId: string,
    tx: Prisma.TransactionClient,
  ): Promise<Question> {
    return tx.question.delete({
      where: {
        id,
        ownerId: userId,
      },
    }) as Promise<Question>;
  }

  async hype(
    id: string,
    tx: Prisma.TransactionClient,
  ): Promise<Question | null> {
    return tx.question.update({
      where: {
        id,
      },
      data: {
        hypes: {
          increment: 1,
        },
      },
    }) as Promise<Question>;
  }

  async unhype(
    id: string,
    tx: Prisma.TransactionClient,
  ): Promise<Question | null> {
    return tx.question.update({
      where: {
        id,
      },
      data: {
        hypes: {
          decrement: 1,
        },
      },
    }) as Promise<Question>;
  }

  async findManyByIdsArray(ids: string[]): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    }) as Promise<Question[]>;
  }
}
