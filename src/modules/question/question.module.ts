import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './repositories/question.repository';
import { PrismaQuestionRepository } from './repositories/prisma-question.repository';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/libs/prisma.service';

@Module({
  controllers: [QuestionController],
  providers: [
    QuestionService,
    JwtService,
    PrismaService,
    { provide: QuestionRepository, useClass: PrismaQuestionRepository },
  ],
})
export class QuestionModule {}
