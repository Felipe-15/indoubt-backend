import { Injectable } from '@nestjs/common';
import { AlreadyHypedQuestionError } from '../exceptions/AlreadyHypedQuestion';
import { NeverHypedQuestionError } from '../exceptions/NeverHypedQuestion';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './repositories/question.repository';
import { UnitOfWork } from './uow/unit-of-work';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private readonly uow: UnitOfWork,
  ) {}

  create(createQuestionDto: CreateQuestionDto & { ownerId: string }) {
    return this.questionRepository.create(createQuestionDto);
  }

  findAll() {
    return this.questionRepository.findAll();
  }

  findOne(id: string) {
    return this.questionRepository.findOne(id);
  }

  update(
    questionId: string,
    requestId: string,
    updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionRepository.update(
      questionId,
      requestId,
      updateQuestionDto,
    );
  }

  hype(id: string, ownerId: string) {
    try {
      return this.uow.execute(
        async ({ questionRepository, hypeRepository }, tx) => {
          const [question, hype] = await Promise.all([
            questionRepository.hype(id, tx),
            hypeRepository.create(
              {
                relatedQuestion: id,
                ownerId: ownerId,
              },
              tx,
            ),
          ]);

          return { question, hype };
        },
      );
    } catch {
      throw new AlreadyHypedQuestionError();
    }
  }

  unhype(ownerId: string, questionId: string) {
    try {
      return this.uow.execute(
        async ({ questionRepository, hypeRepository }, tx) => {
          const [question] = await Promise.all([
            questionRepository.unhype(questionId, tx),
            hypeRepository.delete(ownerId, questionId, tx),
          ]);

          return { question };
        },
      );
    } catch {
      throw new NeverHypedQuestionError();
    }
  }

  remove(id: string, requestId: string) {
    return this.uow.execute(
      async ({ hypeRepository, questionRepository }, tx) => {
        await Promise.all([
          hypeRepository.deleteManyByQuestionId(id, tx),
          questionRepository.delete(id, requestId, tx),
        ]);
      },
    );
  }

  findManyByIdsArray(ids: string[]) {
    return this.questionRepository.findManyByIdsArray(ids);
  }
}
