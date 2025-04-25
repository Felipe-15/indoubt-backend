import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpClient } from 'src/interfaces/http-client.interface';
import { IVectorialService } from './vectorial-service.interface';

@Injectable()
export class VectorialService implements IVectorialService {
  private API_URL = process.env.VECTOR_SEARCH_URL;
  constructor(private httpService: HttpClient) {}

  async search(
    query: string,
  ): Promise<{ linkedId: string; content: string }[]> {
    return firstValueFrom(
      this.httpService
        .get<{
          results: { properties: { linkedId: string; content: string } }[];
        }>(this.API_URL + `/search?q=${query}`)
        .pipe(
          map((response) =>
            response.results.map((result) => ({
              linkedId: result.properties.linkedId,
              content: result.properties.content,
            })),
          ),
        ),
    );
  }

  async create({
    linkedId,
    question,
  }: {
    linkedId: string;
    question: string;
  }): Promise<{ linkedId: string; content: string }> {
    return firstValueFrom(
      this.httpService.post<
        { linkedId: string; question: string },
        { linkedId: string; content: string }
      >(this.API_URL + '/question', {
        linkedId,
        question,
      }),
    );
  }
}
