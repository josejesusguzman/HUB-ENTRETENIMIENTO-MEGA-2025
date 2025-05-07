import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { StorageService } from '../../services/storage.service';
import { ConfirmHideModalComponent } from "../../components/confirm-hide-modal/confirm-hide-modal.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieFacadeService } from '../../services/movie-facade.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  imports: [
    ConfirmHideModalComponent,
    RouterModule,
    CommonModule
  ]
})
export class CatalogComponent implements OnInit {
  movies: any[] = [];              // Lista de películas a mostrar
  movieToHide: any = null;         // Película seleccionada para ocultar (para el modal)
  hideMessage: string = '';        // Mensaje de confirmación temporal después de ocultar
  catalog$ = this.facade.catalog$;

  constructor(
    private tmdb: TmdbService,
    private storage: StorageService,
    private facade: MovieFacadeService
  ) {}

  ngOnInit(): void {
    // Obtener películas populares al iniciar
    this.tmdb.getPopularMovies().subscribe(response => {
      this.movies = response.results;
      // Filtrar las películas ocultas
      const hiddenIds = this.storage.getHiddenMovies();
      this.movies = this.movies.filter(m => !hiddenIds.includes(m.id));
    });
  }

  // Mostrar modal de confirmación para ocultar una película
  confirmHide(movie: any): void {
    this.movieToHide = movie;
  }

  // Ocultar efectivamente la película (se llama al confirmar en el modal)
  hideMovieConfirmed(): void {
    if (this.movieToHide) {
      const movieId = this.movieToHide.id;
      this.storage.hideMovie(movieId);  // Guardar en localStorage que está oculta
      // Remover de la lista actual de películas
      this.movies = this.movies.filter(m => m.id !== movieId);
      // Mostrar mensaje de confirmación temporal
      this.hideMessage = `"${this.movieToHide.title}" ha sido ocultada del catálogo.`;
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => { this.hideMessage = ''; }, 3000);
      // Cerrar el modal
      this.movieToHide = null;
    }
  }

  // Cancelar la acción de ocultar (cerrar modal sin ocultar)
  cancelHide(): void {
    this.movieToHide = null;
  }
}
