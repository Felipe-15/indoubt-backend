import { Prisma, PrismaClient } from '@prisma/client';
import { HypeRepository } from './hype.repository';
import { Hype } from '../hype.entity';
import { CreateHypeDto } from '../dto/create-hype';

export class PrismaHypeRepository implements HypeRepository {
  constructor(private prisma: PrismaClient) {}

  async create(
    data: CreateHypeDto,
    tx: Prisma.TransactionClient,
  ): Promise<Hype> {
    return tx.hype.create({
      data,
    });
  }

  async findById(
    ownerId: string,
    relatedQuestion: string,
  ): Promise<Hype | null> {
    return await this.prisma.hype.findUnique({
      where: { ownerId_relatedQuestion: { ownerId, relatedQuestion } },
    });
  }

  async delete(
    ownerId: string,
    relatedQuestion: string,
    tx: Prisma.TransactionClient,
  ): Promise<Hype | null> {
    return tx.hype.delete({
      where: { ownerId_relatedQuestion: { ownerId, relatedQuestion } },
    });
  }

  async findAll(): Promise<Hype[]> {
    return await this.prisma.hype.findMany();
  }

  async findByUserId(id: string): Promise<Hype[]> {
    return await this.prisma.hype.findMany({
      where: {
        ownerId: id,
      },
    });
  }

  async findByQuestionId(id: string): Promise<Hype[]> {
    return await this.prisma.hype.findMany({
      where: {
        relatedQuestion: id,
      },
    });
  }

  async countAllByQuestion(id: string): Promise<number> {
    return await this.prisma.hype.count({
      where: {
        relatedQuestion: id,
      },
    });
  }

  async countAllByUser(id: string): Promise<number> {
    return await this.prisma.hype.count({
      where: {
        ownerId: id,
      },
    });
  }

  deleteManyByQuestionId(
    questionId: string,
    tx: Prisma.TransactionClient,
  ): Promise<Prisma.BatchPayload> {
    return tx.hype.deleteMany({
      where: {
        relatedQuestion: questionId,
      },
    });
  }
}
