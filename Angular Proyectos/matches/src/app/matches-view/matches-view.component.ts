import { Component, OnInit } from '@angular/core';
import { MatchInfoComponent } from '../match-info/match-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Match } from '../interfaces/match';

@Component({
  selector: 'app-matches-view',
  standalone: true,
  imports: [MatchInfoComponent, CommonModule, FormsModule],
  templateUrl: './matches-view.component.html',
  styleUrl: './matches-view.component.css'
})
export class MatchesViewComponent implements OnInit { 

  matches: Match[] = [];
  fecha: Date = new Date();

  //Uso de OnInit para inicializar el array de Match(interface)
  ngOnInit(): void {
    this.matches = [
      {name: 'Boca vs Riber', date: this.fecha},
      {name: 'Barca vs Madrid', date: this.fecha},
      {name: 'Independiente vs Racing', date: this.fecha},
      {name: 'PSG vs Marsella', date: this.fecha},
      {name: 'Milan vs Inter', date: this.fecha},
      {name: 'Liverpool vs Manchester', date: this.fecha},
      {name: 'Bayern vs Dortmund', date: this.fecha},
      {name: 'Juventus vs Napoli', date: this.fecha},
      {name: 'Chelsea vs Arsenal', date: this.fecha}
    ];
  }

  //Para cambiar el texto en el parrafo superior del padre
  matchSelected: string = '';
  onSelected(match: string) {
    this.matchSelected = match;
  }

  onDeleteLastMatch() {
    this.matches.pop(); //Elimina el ultimo elemento del array
  }
}
