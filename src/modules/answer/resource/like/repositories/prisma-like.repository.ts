import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { CreateLikeDto } from '../dto/create-like.dto';
import { Like } from '../like.entity';
import { PrismaService } from 'src/libs/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaLikeRepository implements LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateLikeDto,
    tx: Prisma.TransactionClient,
  ): Promise<Like> {
    return await tx.like.create({
      data,
    });
  }

  async delete(
    relatedAnswer: string,
    ownerId: string,
    tx: Prisma.TransactionClient,
  ): Promise<Like | null> {
    return await tx.like.delete({
      where: {
        ownerId_relatedAnswer: {
          relatedAnswer,
          ownerId,
        },
      },
    });
  }
}
