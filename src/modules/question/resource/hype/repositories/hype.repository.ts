import { Hype } from '../hype.entity';
import { CreateHypeDto } from '../dto/create-hype';

export abstract class HypeRepository {
  abstract create(data: CreateHypeDto, tx: unknown): Promise<Hype>;

  abstract countAllByUser(id: string): Promise<number>;
  abstract countAllByQuestion(id: string): Promise<number>;
  abstract findAll(): Promise<Hype[]>;
  abstract findByUserId(id: string): Promise<Hype[]>;
  abstract findByQuestionId(id: string): Promise<Hype[]>;
  abstract deleteManyByQuestionId(
    questionId: string,
    tx: unknown,
  ): Promise<unknown>;
  abstract delete(
    ownerId: string,
    relatedQuestion: string,
    tx: unknown,
  ): Promise<Hype | null>;
}
