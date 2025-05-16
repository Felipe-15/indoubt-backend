import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  relatedAnswer: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
