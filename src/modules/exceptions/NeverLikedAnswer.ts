export class NeverLikedAnswer extends Error {
  constructor() {
    super('You have never liked this answer');
    this.name = 'NeverLikedAnswer';
  }
}
