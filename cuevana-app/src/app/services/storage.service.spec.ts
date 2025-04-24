// src/app/services/storage.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const FAVORITES_KEY = 'favorites';
  const HIDDEN_KEY = 'hiddenMovies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
    // Limpiamos localStorage antes de cada test
    localStorage.clear();
  });

  describe('#getFavorites & #addFavorite & #removeFavorite & #isFavorite', () => {
    const movieA = { id: 1, title: 'Peli A', poster_path: '/a.jpg' };
    const movieB = { id: 2, title: 'Peli B', poster_path: '/b.jpg' };

    it('debería devolver array vacío si no hay favoritos', () => {
      expect(service.getFavorites()).toEqual([]);
    });

    it('debería agregar una película a favoritos', () => {
      service.addFavorite(movieA);
      const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY)!);
      expect(stored).toEqual([movieA]);
      expect(service.getFavorites()).toEqual([movieA]);
    });

    it('no debería duplicar si se agrega dos veces la misma película', () => {
      service.addFavorite(movieA);
      service.addFavorite(movieA);
      expect(service.getFavorites()).toEqual([movieA]);
    });

    it('isFavorite debe reflejar si una película está en favoritos', () => {
      expect(service.isFavorite(movieA.id)).toBeFalse();
      service.addFavorite(movieA);
      expect(service.isFavorite(movieA.id)).toBeTrue();
    });

    it('debería quitar una película de favoritos', () => {
      service.addFavorite(movieA);
      service.addFavorite(movieB);
      expect(service.getFavorites()).toEqual([movieA, movieB]);

      service.removeFavorite(movieA.id);
      expect(service.getFavorites()).toEqual([movieB]);
      expect(service.isFavorite(movieA.id)).toBeFalse();
    });
  });

  describe('#getHiddenMovies & #hideMovie & #showMovie', () => {
    const idA = 10;
    const idB = 20;

    it('debería devolver array vacío si no hay ocultos', () => {
      expect(service.getHiddenMovies()).toEqual([]);
    });

    it('debería ocultar un ID de película', () => {
      service.hideMovie(idA);
      const stored = JSON.parse(localStorage.getItem(HIDDEN_KEY)!);
      expect(stored).toEqual([idA]);
      expect(service.getHiddenMovies()).toEqual([idA]);
    });

    it('no debería duplicar si se oculta dos veces el mismo ID', () => {
      service.hideMovie(idA);
      service.hideMovie(idA);
      expect(service.getHiddenMovies()).toEqual([idA]);
    });

    it('debería ocultar varios IDs y luego mostrarlos', () => {
      service.hideMovie(idA);
      service.hideMovie(idB);
      expect(service.getHiddenMovies().sort()).toEqual([idA, idB].sort());

      service.showMovie(idA);
      expect(service.getHiddenMovies()).toEqual([idB]);
      service.showMovie(idB);
      expect(service.getHiddenMovies()).toEqual([]);
    });
  });
});
