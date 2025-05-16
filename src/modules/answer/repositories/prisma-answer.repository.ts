import { PrismaService } from 'src/libs/prisma.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Answer } from '../entities/answer.entity';
import { AnswerRepository } from './answer.repository';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAnswerDto & { ownerId: string }): Promise<Answer> {
    return await this.prisma.answer.create({
      data,
    });
  }

  async update(id: string, data: UpdateAnswerDto): Promise<Answer> {
    return await this.prisma.answer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, ownerId: string): Promise<Answer> {
    return await this.prisma.answer.delete({
      where: {
        id,
        ownerId,
      },
    });
  }

  async findAll(): Promise<Answer[]> {
    return await this.prisma.answer.findMany();
  }

  async findById(id: string): Promise<Answer | null> {
    return await this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async findManyByQuestionId(relatedQuestion: string): Promise<Answer[]> {
    return await this.prisma.answer.findMany({
      where: {
        relatedQuestion,
      },
    });
  }

  async findManyByUserId(ownerId: string): Promise<Answer[]> {
    return await this.prisma.answer.findMany({
      where: {
        ownerId,
      },
    });
  }

  async like(id: string, tx: Prisma.TransactionClient) {
    return await tx.answer.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  async dislike(id: string, tx: Prisma.TransactionClient) {
    return await tx.answer.update({
      where: { id },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });
  }
}
