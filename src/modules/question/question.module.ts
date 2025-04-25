import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosAdapterService } from 'src/adapters/axios.adapter';
import { HttpClient } from 'src/interfaces/http-client.interface';
import { PrismaService } from 'src/libs/prisma.service';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaQuestionRepository } from './repositories/prisma-question.repository';
import { QuestionRepository } from './repositories/question.repository';
import { HypeRepository } from './resource/hype/repositories/hype.repository';
import { PrismaHypeRepository } from './resource/hype/repositories/prisma-hype.repository';
import { IVectorialService } from './resource/vector/vectorial-service.interface';
import { VectorialService } from './resource/vector/vectorial.service';
import { PrismaUnitOfWork } from './uow/prisma-unit-of-work';
import { UnitOfWork } from './uow/unit-of-work';

@Module({
  imports: [HttpModule],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    JwtService,
    PrismaService,
    { provide: QuestionRepository, useClass: PrismaQuestionRepository },
    { provide: HypeRepository, useClass: PrismaHypeRepository },
    { provide: UnitOfWork, useClass: PrismaUnitOfWork },
    { provide: IVectorialService, useClass: VectorialService },
    { provide: HttpClient, useClass: AxiosAdapterService },
  ],
})
export class QuestionModule {}
