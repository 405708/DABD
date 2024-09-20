import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameViewComponent } from "./game-view/game-view.component";
import { GameFormComponent } from './game-form/game-form.component';
import { GameCreator, GameItem } from '../models/game.item.model';
import { GameActComponent } from "./game-act/game-act.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GameViewComponent, GameFormComponent, GameActComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'games';

}
