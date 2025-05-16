import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerRepository } from './repositories/answer.repository';
import { UnitOfWork } from './uow/unit-of-work';
import { AlreadyLikedAnswer } from '../exceptions/AlreadyLikedAnswer';
import { NeverLikedAnswer } from '../exceptions/NeverLikedAnswer';

@Injectable()
export class AnswerService {
  constructor(
    private answerRepository: AnswerRepository,
    private uow: UnitOfWork,
  ) {}
  create(createAnswerDto: CreateAnswerDto & { ownerId: string }) {
    return this.answerRepository.create(createAnswerDto);
  }

  findAll() {
    return this.answerRepository.findAll();
  }

  findOne(id: string) {
    return this.answerRepository.findById(id);
  }

  update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return this.answerRepository.update(id, updateAnswerDto);
  }

  remove(id: string, ownerId: string) {
    return this.answerRepository.delete(id, ownerId);
  }

  like(id: string, ownerId: string) {
    try {
      return this.uow.execute(
        async ({ answerRepository, likeRepository }, tx) => {
          const [answer] = await Promise.all([
            answerRepository.like(id, tx),
            likeRepository.create(
              {
                relatedAnswer: id,
                ownerId: ownerId,
              },
              tx,
            ),
          ]);
          return answer;
        },
      );
    } catch {
      throw new AlreadyLikedAnswer();
    }
  }

  dislike(id: string, ownerId: string) {
    try {
      return this.uow.execute(
        async ({ answerRepository, likeRepository }, tx) => {
          const [answer] = await Promise.all([
            answerRepository.dislike(id, tx),
            likeRepository.delete(id, ownerId, tx),
          ]);
          return answer;
        },
      );
    } catch {
      throw new NeverLikedAnswer();
    }
  }
}
