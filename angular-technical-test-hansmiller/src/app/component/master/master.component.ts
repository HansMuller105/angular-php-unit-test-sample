import { Component } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { GameService } from '../../service/game.service';
 import { Game } from '../../model/game';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {
  server_sources: Game[] = [];
  games: Game[] = [];
  genreTypes: string[] = [];
  platformtypes: string[] = [];
  loading: boolean = true;
  error: string | null = null;
  openSectionId: string | null = null;

  currentPage = 1;
  itemsPerPage = 8;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGameList().subscribe({
      next: (data) => {
        if(data && data.hasOwnProperty('length')){
          this.server_sources = data;
          this.games = this.server_sources;
          this.loading = false;

          this.initializeGenreType()
          this.initializePlatformType()
        }      
      },
      error: (err) => {
        this.error = 'Error fetching games';
        this.loading = false;
      }
    });
  }

  initializePlatformType(): void {
      this.platformtypes = this.getUniqueTypes(this.server_sources, "platform");
  }

  initializeGenreType(): void { 
      this.genreTypes = this.getUniqueTypes(this.server_sources, "genre");
  }

  getUniqueTypes<Game>(data: Game[], typeProperty: keyof Game): string[] {
    const types = data.map(item => item[typeProperty] as unknown as string);
    return Array.from(new Set(types));
  }

  onSearchByTitle(event: Event): void {
    const input = event.target as HTMLInputElement;
    var title = input.value;

    this.games = this.server_sources.filter(m => m.title.toLowerCase().includes(title.toLowerCase()) )
  }

  onSearchByPlatform(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    var selectedValue = selectElement.value;
    this.games = selectedValue === "All" ? this.server_sources : this.server_sources.filter(m => m.platform === selectedValue)
  }

  onSearchByGenre(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    var selectedValue = selectElement.value;
    this.games = this.server_sources.filter(m => m.genre.includes(selectedValue))
  }

  // Method to toggle collapse sections
  toggleSection(sectionId: string): void {
    this.openSectionId = this.openSectionId === sectionId ? null : sectionId;
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.games.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.games.length / this.itemsPerPage);
  }

  get paginationButtons() {
    const total = this.totalPages;
    const delta = 2; // Number of buttons to show before and after the current page
    const range: (number | '...')[] = [];

    let start = Math.max(this.currentPage - delta, 1);
    let end = Math.min(this.currentPage + delta, total);

    if (total > 1) {
      if (start > 1) {
        range.push(1);
        if (start > 2) range.push('...');
      }
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      if (end < total) {
        if (end < total - 1) range.push('...');
        range.push(total);
      }
    }

    return range;
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}
