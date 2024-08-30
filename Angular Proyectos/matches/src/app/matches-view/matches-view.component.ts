import { Component } from '@angular/core';
import { MatchInfoComponent } from '../match-info/match-info.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches-view',
  standalone: true,
  imports: [MatchInfoComponent, CommonModule],
  templateUrl: './matches-view.component.html',
  styleUrl: './matches-view.component.css'
})
export class MatchesViewComponent {
  matches: string[] = ['Boca vs Riber', 'Barca vs Madrid', 'Independiente vs Racing'];

  //Para cambiar el texto en el parrafo superior del padre
  matchSelected: string = '';
  onSelected(match: string) {
    this.matchSelected = match;
  }
}
