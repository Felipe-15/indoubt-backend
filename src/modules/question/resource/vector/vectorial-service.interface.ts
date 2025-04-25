export abstract class IVectorialService {
  abstract search(
    query: string,
  ): Promise<{ linkedId: string; content: string }[]>;

  abstract create(data: {
    linkedId: string;
    question: string;
  }): Promise<{ linkedId: string; content: string }>;
}
