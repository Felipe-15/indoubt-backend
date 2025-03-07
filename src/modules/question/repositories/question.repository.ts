import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';

export abstract class QuestionRepository {
  abstract create(data: CreateQuestionDto): Promise<Question>;
  abstract findAll(page?: number, pageSize?: number): Promise<Question[]>;
  abstract findOne(id: string): Promise<Question | null>;
  abstract update(
    questionId: string,
    requestId: string,
    data: UpdateQuestionDto,
  ): Promise<Question | null>;
  abstract delete(id: string, requestId: string): Promise<void>;
}
