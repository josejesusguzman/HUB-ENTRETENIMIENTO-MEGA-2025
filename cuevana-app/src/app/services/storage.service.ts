import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private FAVORITES_KEY = 'favorites';
  private HIDDEN_KEY = 'hiddenMovies';

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  getFavorites(): any[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }
    const data = localStorage.getItem(this.FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  addFavorite(movie: any): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    const favs = this.getFavorites();
    if (!favs.find((m: any) => m.id === movie.id)) {
      favs.push(movie);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favs));
    }
  }

  removeFavorite(movieId: number): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    let favs = this.getFavorites();
    favs = favs.filter((m: any) => m.id !== movieId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favs));
  }

  isFavorite(movieId: number): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    return this.getFavorites().some((m: any) => m.id === movieId);
  }

  getHiddenMovies(): number[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }
    const data = localStorage.getItem(this.HIDDEN_KEY);
    return data ? JSON.parse(data) : [];
  }

  hideMovie(movieId: number): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    const hidden = this.getHiddenMovies();
    if (!hidden.includes(movieId)) {
      hidden.push(movieId);
      localStorage.setItem(this.HIDDEN_KEY, JSON.stringify(hidden));
    }
  }

  showMovie(movieId: number): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    let hidden = this.getHiddenMovies();
    hidden = hidden.filter(id => id !== movieId);
    localStorage.setItem(this.HIDDEN_KEY, JSON.stringify(hidden));
  }
}