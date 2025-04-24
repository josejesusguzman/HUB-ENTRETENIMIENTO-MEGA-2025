import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  imports: [
    RouterModule,
    CommonModule
  ],
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any;                 // Detalles de la película actual
  recommendations: any[] = []; // Lista de películas recomendadas
  isFavorite: boolean = false; // Indicador si está en favoritos

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la película desde la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const movieId = Number(idParam);

      // Llamada API para detalles de la película
      this.tmdb.getMovieDetails(movieId).subscribe(data => {
        this.movie = data;
        // Comprobar si esta película ya está en favoritos
        this.isFavorite = this.storage.isFavorite(movieId);
      });

      // Llamada API para recomendaciones de esta película
      this.tmdb.getMovieRecommendations(movieId).subscribe(res => {
        this.recommendations = res.results.filter((rec: any) => {
          // opcional: filtramos las recomendaciones ocultas si alguna estuviera oculta
          const hiddenIds = this.storage.getHiddenMovies();
          return !hiddenIds.includes(rec.id);
        });
      });
    }
  }

  // Alternar favorito: agrega o quita de favoritos según el estado actual
  toggleFavorite(): void {
    if (!this.movie) return;
    if (this.isFavorite) {
      this.storage.removeFavorite(this.movie.id);
      this.isFavorite = false;
    } else {
      // Guardamos un objeto con datos mínimos necesarios en favoritos
      const favMovie = {
        id: this.movie.id,
        title: this.movie.title,
        poster_path: this.movie.poster_path
      };
      this.storage.addFavorite(favMovie);
      this.isFavorite = true;
    }
  }
}
