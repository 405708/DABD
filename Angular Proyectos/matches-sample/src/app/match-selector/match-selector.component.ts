import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatchService } from '../services/match.service';


@Component({
  selector: 'app-match-selector',
  standalone: true,
  imports: [NgStyle, CommonModule],
  templateUrl: './match-selector.component.html',
  styleUrl: './match-selector.component.css'
})
export class MatchSelectorComponent {
  matchSelected : string = "";

  private matchService = inject(MatchService);

  constructor() {}

  //Uso de observable para recibir valores con subscribe
  //Al iniciar el componente
  ngOnInit() {
    this.listenSelectedMatch();
  }

  listenSelectedMatch(){
    this.matchService.getSelectedMatch().subscribe({
      next: (match: string) => this.matchSelected = match,
      }
    );
  }


}
