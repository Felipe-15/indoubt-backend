import { CreateLikeDto } from '../dto/create-like.dto';
import { Like } from '../like.entity';

export abstract class LikeRepository {
  abstract create(createLikeDto: CreateLikeDto, tx: unknown): Promise<Like>;
  abstract delete(
    relatedAnswer: string,
    ownerId: string,
    tx: unknown,
  ): Promise<Like | null>;
}
