// src/app/services/movie-facade.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TmdbService }     from './tmdb.service';
import { StorageService }  from './storage.service';
import { isPlatformBrowser } from '@angular/common';

import {
  BehaviorSubject,
  Observable,
  timer,
  of,
  defer
} from 'rxjs';
import {
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
  catchError,
  shareReplay
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovieFacadeService {
  /** Indicador para no tocar localStorage en server */
  private isBrowser = isPlatformBrowser(this.platformId);

  public catalog$ = defer(() => {
    if (this.isBrowser) {
      // Vas a hacer el pooling cada minuto
      return timer(0, 60_000).pipe(
        switchMap(() => this.tmdb.getPopularMovies()),
        map(res => res.results),
        catchError(() => of([]))
      );
    } else {
      // Si estoy en el server 
      return this.tmdb.getPopularMovies().pipe(
        map(res => res.results),
        catchError(() => of([]))
      );
    }
  }).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /** Subject interno para el término de búsqueda */
  private searchTerm$ = new BehaviorSubject<string>('');

  /** STREAM: resultados de búsqueda reactiva */
  public searchResults$: Observable<any[]> = this.searchTerm$.pipe(
    // Espera 300 ms tras el último carácter
    debounceTime(300),
    // Solo sigue si cambió realmente el término
    distinctUntilChanged(),
    // Ignora búsquedas muy cortas
    filter(term => term.length >= 3),
    // Cancela petición anterior y lanza nueva
    switchMap(term =>
      this.tmdb.getMovieSearch(term).pipe(
        map(res => res.results),
        catchError(err => {
          console.error('Error en búsqueda:', err);
          return of([]); // fallback a arreglo vacío
        })
      )
    ),
    // Repite el último valor a nuevos suscriptores
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private tmdb: TmdbService,
    private storage: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /** Dispara una nueva búsqueda */
  setSearchTerm(term: string): void {
    this.searchTerm$.next(term.trim());
  }

  /** Limpia la búsqueda (vuelve a estado inicial) */
  clearSearch(): void {
    this.searchTerm$.next('');
  }
}
