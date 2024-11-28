import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorite/favorite.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'movies', component: MovieListComponent },
  { path: '**', redirectTo: '' }
];
