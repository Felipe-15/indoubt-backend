export class Question {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  verifiedAnswer?: string;
  answers: number;
  hypes: number;
  ownerId: string;
}
