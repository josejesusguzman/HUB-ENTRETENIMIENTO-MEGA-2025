import { Routes } from '@angular/router';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./pages/catalog/catalog.component')
                .then(m => m.CatalogComponent)
        
    },

    {
        path: 'favorites',
        canActivate: [AuthGuard],
        loadComponent: () => 
            import('./pages/favorites/favorites.component')
                .then(m => m.FavoritesComponent)
    },

    { path: 'movie/:id', component: MovieDetailComponent },  // ruta de detalle
    { path: 'favorites', component: FavoritesComponent },
    { path: '**', redirectTo: '' }
];
