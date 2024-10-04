import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matches: Match[] = [
    {
      local: "Equipo1",
      visitor: "Equipo2",
      localScore: 1,
      visitorScore: 2
    },
    {
      local: "Equipo3",
      visitor: "Equipo4",
      localScore: 3,
      visitorScore: 0,
      date: new Date()
    }
  ];

  //Subject es un tipo de observable que permite enviar y recibir valores
  private matchSelectedSubject = new Subject<string>();

  //Envia valores a los subscriptores
  sendSelectedMatch(string: string) {
    this.matchSelectedSubject.next(string);
  }

  //Recibe valores de los subscriptores
  getSelectedMatch() : Observable<string> {
    const observable = this.matchSelectedSubject.asObservable();
    return observable;
  }

  getAll(): Match[] {
    return [
      ...this.matches 
    ];
  }

  deleteLast() {
    this.matches.pop();
  }

  delete(index: number) {
    this.matches.splice(index, 1);
  }

  add(match: Match) {
    this.matches.push(match);
  }
}
