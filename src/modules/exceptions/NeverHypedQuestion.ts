export class NeverHypedQuestionError extends Error {
  constructor() {
    super('This question was never hyped by the user');
    this.name = 'NeverHypedQuestionError';
  }
}
