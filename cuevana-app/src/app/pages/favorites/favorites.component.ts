import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  imports: [
    RouterModule
  ],
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    // Obtener la lista de favoritos del localStorage al iniciar
    this.favoriteMovies = this.storage.getFavorites();
  }

  // Quitar de favoritos y actualizar la lista
  removeFavorite(movieId: number): void {
    this.storage.removeFavorite(movieId);
    // Filtramos la lista local para reflejar el cambio inmediatamente
    this.favoriteMovies = this.favoriteMovies.filter(m => m.id !== movieId);
  }
}
