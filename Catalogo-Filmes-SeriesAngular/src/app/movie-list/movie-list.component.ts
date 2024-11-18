import {Component, OnInit} from '@angular/core';
import {OmdbService} from '../services/omdb.service';
import {FavoriteService} from '../services/FavoriteService';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  searchTerm: string = '';

  constructor(
    private omdbService: OmdbService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Opcional: Inicializar a lista com filmes populares ou favoritos
  }

  viewDetails(imdbID: string): void {
    this.router.navigate(['/movie', imdbID]);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie.imdbID)) {
      this.favoriteService.removeFavorite(movie.imdbID);
      alert('Removido dos favoritos.');
    } else {
      this.favoriteService.addFavorite(movie);
      alert('Adicionado aos favoritos.');
    }
  }

  isFavorite(imdbID: string): boolean {
    return this.favoriteService.isFavorite(imdbID);
  }
}
