export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public createdAt: Date,
    public points: number,
    public answered: number,
    public helped: number,
    public password?: string,
    public provider?: string,
    public photoURL?: string,
  ) {}
}
