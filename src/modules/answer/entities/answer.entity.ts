export class Answer {
  constructor(
    public readonly id: string,
    public content: string,
    public relatedQuestion: string,
    public ownerId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
