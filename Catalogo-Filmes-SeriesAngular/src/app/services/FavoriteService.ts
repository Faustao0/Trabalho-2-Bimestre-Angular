import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storageKey = 'favoriteMovies';

  getFavorites(): any[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(movie: any): void {
    const favorites = this.getFavorites();
    favorites.push(movie);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  removeFavorite(id: string): void {
    const favorites = this.getFavorites().filter(movie => movie.imdbID !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().some(movie => movie.imdbID === id);
  }
}
