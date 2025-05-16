export class AlreadyLikedAnswer extends Error {
  constructor() {
    super('You have already liked this answer');
    this.name = 'AlreadyLikedAnswer';
  }
}
