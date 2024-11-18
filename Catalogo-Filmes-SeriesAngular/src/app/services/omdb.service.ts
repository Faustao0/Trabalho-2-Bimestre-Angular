import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '50c4a3b4';

  constructor(private http: HttpClient) {}

  searchMovies(title: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('s', title);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Erro ao buscar filmes:', error);
        return throwError(() => new Error('Erro na API.'));
      })
    );
  }

  getMovieDetails(id: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('i', id);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Erro ao buscar detalhes do filme:', error);
        return throwError(() => new Error('Erro na API.'));
      })
    );
  }
}
