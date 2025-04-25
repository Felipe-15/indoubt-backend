import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHypeDto {
  @IsNotEmpty()
  @IsString()
  relatedQuestion: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}
