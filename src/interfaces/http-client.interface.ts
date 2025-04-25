import { Observable } from 'rxjs';

export abstract class HttpClient {
  abstract get<T>(url: string, options?: unknown): Observable<T>;
  abstract post<T, K>(url: string, data: T, options?: unknown): Observable<K>;
  abstract put<T, K>(url: string, data: T, options?: unknown): Observable<K>;
  abstract delete<T>(url: string, options?: unknown): Observable<T>;
}
