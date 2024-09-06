import { Component, OnInit } from '@angular/core';
import { MatchInfoComponent } from '../match-info/match-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Match } from '../interfaces/match';
import { MatchFormComponent } from "../match-form/match-form.component";

@Component({
  selector: 'app-matches-view',
  standalone: true,
  imports: [MatchInfoComponent, CommonModule, FormsModule, MatchFormComponent, MatchFormComponent],
  templateUrl: './matches-view.component.html',
  styleUrl: './matches-view.component.css'
})
export class MatchesViewComponent implements OnInit { 

  matches: Match[] = [];
  fecha: Date = new Date();

  //Uso de OnInit para inicializar el array de Match(interface)
  ngOnInit(): void {
    this.matches = [
      {local: 'Boca', visitante: 'Riber', date: this.fecha, resultlocal: 2, resultvisit: 1},
      {local: 'Barca', visitante: 'Madrid', date: this.fecha, resultlocal: 3, resultvisit: 2},
      {local: 'Independiente', visitante: 'Racing', date: this.fecha, resultlocal: 1, resultvisit: 1},
      {local: 'PSG', visitante: 'Marsella', date: this.fecha, resultlocal: 2, resultvisit: 0},
      {local: 'Milan', visitante: 'Inter', date: this.fecha, resultlocal: 1, resultvisit: 1},
      {local: 'Liverpool', visitante: 'Manchester', date: this.fecha, resultlocal: 2, resultvisit: 2},
      {local: 'Bayern', visitante: 'Dortmund', date: this.fecha, resultlocal: 3, resultvisit: 1},
      {local: 'Juventus', visitante: 'Napoli', date: this.fecha, resultlocal: 2, resultvisit: 0},
      {local: 'Chelsea', visitante: 'Arsenal', date: this.fecha, resultlocal: 1, resultvisit: 0},
    ];
  }

  //Para cambiar el texto en el parrafo superior del padre
  matchSelected?: Match;
  onSelected(indexSelected: number) {
    this.matchSelected = this.matches[indexSelected];
  }

  onDeleteLastMatch() {
    this.matches.pop(); //Elimina el ultimo elemento del array
  }

  //Recibe el evento que viene del componente form y lo pushea a la lista de partidos
  addNewMatch(newMatch: Match) {
    this.matches.push(newMatch); //Agrega un nuevo elemento al array
  }
}
