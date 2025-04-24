import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
    { path: '', component: CatalogComponent },
    { path: 'movie/:id', component: MovieDetailComponent },  // ruta de detalle
    { path: 'favorites', component: FavoritesComponent },
    { path: '**', redirectTo: '' }
];
