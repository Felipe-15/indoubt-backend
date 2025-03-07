import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum SubjectsEnum {
  MATH = 'math',
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  BIOLOGY = 'biology',
  ENGLISH = 'english',
}

export enum ScholarshipEnum {
  ELEMENTARY = 'elementary',
  HIGH_SCHOOL = 'high-school',
  COLLEGE = 'college',
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(SubjectsEnum)
  @IsNotEmpty()
  subject: string;

  @IsEnum(ScholarshipEnum)
  @IsNotEmpty()
  scholarship: string;

  attachs: string;
}
