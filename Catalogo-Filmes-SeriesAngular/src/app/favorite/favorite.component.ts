import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoriteService } from '../services/FavoriteService';
import {HeaderComponent} from '../header/header/header.component';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HttpClientModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoritesComponent {
  favoriteMovies: any[] = [];
  movies: any[] = [];
  selectedMovie: any = null;

  constructor(protected favoriteService: FavoriteService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteMovies = this.favoriteService.getFavorites();
  }

  removeFavorite(id: string): void {
    this.favoriteService.removeFavorite(id);
    this.loadFavorites();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
