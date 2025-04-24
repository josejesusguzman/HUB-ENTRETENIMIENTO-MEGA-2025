import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = environment.TMDB_BASE_URL;
  private apiKey = environment.TMDB_API_KEY;

  constructor(private http: HttpClient) {}

  // Obtener películas populares para el catálogo
  getPopularMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }

  // Obtener detalles de una película por ID
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }

  // Obtener recomendaciones de películas relacionadas a una película dada
  getMovieRecommendations(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }
}
