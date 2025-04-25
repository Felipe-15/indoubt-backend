export class Question {
  constructor(
    public readonly id: string,
    public content: string,
    public createdAt: Date,
    public answers: number,
    public hypes: number,
    public ownerId: string,
    public updatedAt?: Date,
    public verifiedAnswer?: string,
  ) {}
}
