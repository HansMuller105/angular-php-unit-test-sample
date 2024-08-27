import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { 
  from,
  Observable 
} from 'rxjs';
import { dev_environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = dev_environment.apiUrl;
  constructor() { }

  //Get all pc Games
  getGameList(): Observable<any[]>{
    return from(axios.get<any[]>(`${this.apiUrl}/games`)).pipe(
      map((response: AxiosResponse<any[]>) => response.data),
      catchError(error => {
        console.error('There was an error!', error);
        throw error; // Propagate the error
      })
    );
  }

  //Get individual game
  getGameById(id: number): Observable<any>{
    return from(axios.get<any>(`${this.apiUrl}/game?id=${id}`)).pipe(
      map((response: AxiosResponse<any>) => response.data),
      catchError(error => {
        console.error('There was an error!', error);
        throw error; // Propagate the error
      })
    )
  }
}
