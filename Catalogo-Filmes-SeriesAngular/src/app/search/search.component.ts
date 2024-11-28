import { Component } from '@angular/core';
import {OmdbService} from '../services/omdb.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header/header.component';
import {FavoriteService} from '../services/FavoriteService';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  movies: any[] = [];
  selectedMovie: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, protected favoriteService: FavoriteService) {}

  searchMovies(): void {
    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Por favor, digite o nome de um filme ou série.';
      this.movies = [];
      this.selectedMovie = null;
      return;
    }

    const params = new HttpParams()
      .set('apikey', '50c4a3b4')
      .set('s', this.searchTerm);

    this.http.get<any>(`https://www.omdbapi.com/`, { params }).subscribe(
      (response) => {
        if (response.Response === 'True') {
          this.movies = response.Search;
          this.errorMessage = '';
        } else {
          this.movies = [];
          this.errorMessage = 'Nenhum filme ou série encontrado.';
        }
      },
      (error) => {
        console.error(error);
        this.movies = [];
        this.errorMessage = 'Erro ao buscar filmes. Tente novamente mais tarde.';
      }
    );
  }

  showMovieDetails(imdbID: string): void {
    const params = new HttpParams()
      .set('apikey', '50c4a3b4')
      .set('i', imdbID);

    this.http.get<any>(`https://www.omdbapi.com/`, { params }).subscribe(
      (response) => {
        if (response.Response === 'True') {
          this.selectedMovie = response;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Detalhes do filme não encontrados.';
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Erro ao buscar detalhes do filme.';
      }
    );
  }

  toggleFavorite(movie: any): void {
    if (this.favoriteService.isFavorite(movie.imdbID)) {
      this.favoriteService.removeFavorite(movie.imdbID);
      alert('Removido dos favoritos.');
    } else {
      this.favoriteService.addFavorite(movie);
      alert('Adicionado aos favoritos.');
    }
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
