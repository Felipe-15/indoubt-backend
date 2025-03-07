import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './repositories/question.repository';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

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

  remove(id: string, requestId: string) {
    return this.questionRepository.delete(id, requestId);
  }
}
