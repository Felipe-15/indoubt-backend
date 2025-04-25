import { HypeRepository } from '../resource/hype/repositories/hype.repository';
import { QuestionRepository } from '../repositories/question.repository';

export abstract class UnitOfWork {
  abstract execute<T>(
    operation: (
      repositories: {
        questionRepository: QuestionRepository;
        hypeRepository: HypeRepository;
      },
      tx: unknown,
    ) => Promise<T>,
  ): Promise<T>;
}
