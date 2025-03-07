import { PrismaService } from 'src/libs/prisma.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question } from '../entities/question.entity';
import { QuestionRepository } from './question.repository';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

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
    requestId: string,
    data: UpdateQuestionDto,
  ): Promise<Question> {
    const originalQuestion = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
    const { isHyping, ...cleanedData } = data;
    const protectedFields = ['content', 'scholarship', 'subject'];
    if (
      Object.keys(data).some((key) => protectedFields.includes(key)) &&
      originalQuestion?.ownerId !== requestId
    ) {
      throw new UnauthorizedException('You are not allowed to update!');
    }

    const hypeIncrement =
      isHyping === true
        ? 1
        : isHyping === false
          ? originalQuestion?.hypes
            ? -1
            : 0
          : 0;

    const question = await this.prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        ...cleanedData,
        hypes: {
          increment: isHyping !== undefined ? hypeIncrement : 0,
        },
      },
    });

    return question as Question;
  }

  async delete(id: string, requestId: string): Promise<void> {
    await this.prisma.question.delete({
      where: {
        id,
        ownerId: requestId,
      },
    });
  }
}
