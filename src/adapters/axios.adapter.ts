import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { map, Observable } from 'rxjs';
import { HttpClient } from 'src/interfaces/http-client.interface';

@Injectable()
export class AxiosAdapterService implements HttpClient {
  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string, options?: AxiosRequestConfig): Observable<T> {
    return this.httpService
      .get<T>(url, options)
      .pipe(map((response) => response.data));
  }
  post<T, K>(
    url: string,
    data: T,
    options?: AxiosRequestConfig,
  ): Observable<K> {
    return this.httpService
      .post<K>(url, data, options)
      .pipe(map((response) => response.data));
  }

  put<T, K>(url: string, data: T, options?: AxiosRequestConfig): Observable<K> {
    return this.httpService
      .put<K>(url, data, options)
      .pipe(map((response) => response.data));
  }

  delete<T>(url: string, options?: AxiosRequestConfig): Observable<T> {
    return this.httpService
      .delete<T>(url, options)
      .pipe(map((response) => response.data));
  }
}
