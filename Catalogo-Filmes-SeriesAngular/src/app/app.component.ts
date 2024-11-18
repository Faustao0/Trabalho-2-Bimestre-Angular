import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Catalogo-Filmes-SeriesAngular';
  searchTerm: string = '';  // Termo de pesquisa
  movies: any[] = [];  // Lista de filmes retornados pela pesquisa
  selectedMovie: any = null;  // Detalhes do filme selecionado
  errorMessage: string = '';  // Mensagem de erro para o usuário

  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '50c4a3b4'; // Substitua pela sua chave de API

  constructor(private http: HttpClient) {}

  // Método para buscar filmes ou séries pela API
  searchMovies(): void {
    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Por favor, digite o nome de um filme ou série.';
      this.movies = [];
      this.selectedMovie = null;
      return;
    }

    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('s', this.searchTerm);

    this.http.get<any>(this.apiUrl, { params }).subscribe(
      (response) => {
        if (response.Response === 'True') {
          this.movies = response.Search;
          this.errorMessage = '';
          this.selectedMovie = null;  // Limpa qualquer filme selecionado
        } else {
          this.movies = [];
          this.selectedMovie = null;
          this.errorMessage = 'Nenhum filme ou série encontrado. Verifique o nome e tente novamente.';
        }
      },
      (error) => {
        console.error(error);
        this.movies = [];
        this.selectedMovie = null;
        this.errorMessage = 'Erro ao buscar filmes. Tente novamente mais tarde.';
      }
    );
  }

  // Método para exibir os detalhes de um filme específico
  showMovieDetails(imdbID: string): void {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('i', imdbID);

    this.http.get<any>(this.apiUrl, { params }).subscribe(
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
}
