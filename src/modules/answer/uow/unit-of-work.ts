import { AnswerRepository } from '../repositories/answer.repository';
import { LikeRepository } from '../resource/like/repositories/like.repository';

export abstract class UnitOfWork {
  abstract execute<T>(
    operation: (
      repositories: {
        answerRepository: AnswerRepository;
        likeRepository: LikeRepository;
      },
      tx: unknown,
    ) => Promise<T>,
  ): Promise<T>;
}
