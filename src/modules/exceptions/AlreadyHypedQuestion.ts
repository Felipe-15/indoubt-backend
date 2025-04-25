export class AlreadyHypedQuestionError extends Error {
  constructor() {
    super('You already hyped this question');
    this.name = 'AlreadyHypedQuestionError';
  }
}
