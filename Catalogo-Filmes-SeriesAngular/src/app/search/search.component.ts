import { Component } from '@angular/core';
import {OmdbService} from '../services/omdb.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private omdbService: OmdbService) {}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.omdbService.searchMovies(this.searchTerm).subscribe(
        results => {
        },
        error => console.error(error)
      );
    }
  }
}
