import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Answer } from '../entities/answer.entity';

export abstract class AnswerRepository {
  abstract create(data: CreateAnswerDto & { ownerId: string }): Promise<Answer>;
  abstract update(id: string, data: UpdateAnswerDto): Promise<Answer>;
  abstract delete(id: string, ownerId: string): Promise<Answer>;
  abstract findAll(): Promise<Answer[]>;
  abstract findById(id: string): Promise<Answer | null>;
  abstract findManyByQuestionId(id: string): Promise<Answer[]>;
  abstract findManyByUserId(id: string): Promise<Answer[]>;
  abstract like(id: string, tx: unknown): Promise<Answer>;
  abstract dislike(id: string, tx: unknown): Promise<Answer>;
}
