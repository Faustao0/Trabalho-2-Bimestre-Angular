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

  constructor(
    private omdbService: OmdbService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }
}
