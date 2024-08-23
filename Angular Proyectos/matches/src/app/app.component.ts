import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchesComponent } from "./matches/matches.component";
import { MatchesViewComponent } from './matches-view/matches-view.component';

@Component({ //Decorador
  selector: 'app-root', //Mediante que etiqueta va a ser llamado este html
  standalone: true,
  imports: [RouterOutlet, MatchesComponent, MatchesViewComponent],
  templateUrl: './app.component.html', //Donde esta el html del componente
  styleUrl: './app.component.css' //Donde esta el estilo del componente
})
export class AppComponent {
  title = 'matches';
}
