import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameViewComponent } from '../game-view/game-view.component';
import { GameFormComponent } from '../game-form/game-form.component';
import { GameItem } from '../../models/game.item.model';

@Component({
  selector: 'app-game-act',
  standalone: true,
  imports: [CommonModule, GameViewComponent, GameFormComponent],
  templateUrl: './game-act.component.html',
  styleUrl: './game-act.component.css'
})
export class GameActComponent {

  gameView : boolean = true;

  nuevoGame(event : Event){
    this.gameView = false;
  }

  volver(){
    this.gameView = true
  }

  gameToAdd : GameItem[] = [] ;
  addNewGame(game : GameItem){
    this,this.gameToAdd.push(game)
  }
}
