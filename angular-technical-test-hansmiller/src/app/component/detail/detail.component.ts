import { Component } from '@angular/core';
import { GameService } from '../../service/game.service';
import { Game } from '../../model/game';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  id: number | null = null; // Initialize id as null
  game: Game = {
    id: 0,
    title: '',
    description: '',
    genre: '',
    thumbnail: '',
    status: '',
    short_description: '',
    game_url: '',
    platform: '',
    publisher: '',
    developer: '',
    release_date: '',
    freetogame_profile_url: '',
    minimum_system_requirements: {
      os: '',
      processor: '',
      memory: '',
      graphics: '',
      storage: ''
    },
    screenshots: [{
      id: 0,
      image: ''
    }]
  }; 
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService  
  ) { }

  ngOnInit(): void {    
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : null;
      if (this.id !== null) {
        this.loadDetail();
      }      
    });
  }

  loadDetail(): void {
    if (this.id !== null) {
      this.gameService.getGameById(this.id).subscribe(
        response => {
          this.game = response;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    }    
  }
}
