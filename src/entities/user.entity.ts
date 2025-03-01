export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  createdAt: Date;
  provider?: string;
  photoURL?: string;
  points: number;
  answered: number;
  helped: number;
}
