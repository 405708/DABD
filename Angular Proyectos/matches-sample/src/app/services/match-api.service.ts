import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchApiService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  getAll() : Observable<Match[]>{
    const observable = this.http.get<Match[]>('https:6317ca93f6b281877c5d7785.mockapi.io/teams');
    return observable;
  }

  add(match : Match): Observable<Match>{
    const matchSave = this.http.post<Match>('https:6317ca93f6b281877c5d7785.mockapi.io/teams', match);
    return matchSave;
  }
  
}
