import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { GameCreator, GameItem } from '../../models/game.item.model';
import { CREATORS, GAME_LIST } from '../../data/game.storage';
import { GameDescComponent } from '../game-desc/game-desc.component';
import { Form } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewDirective } from '../view.directive';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [GameDescComponent, CommonModule, ViewDirective],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  
  @Input() gamesToAdd : GameItem[] = [];
  games: GameItem[] = GAME_LIST;
  creators: GameCreator[] =CREATORS;

  desc : string = "";

  verMas(description : string){
    this.desc = description;
  }

  ngOnChanges(changes : SimpleChanges){
    if(changes['gamesToAdd'] && changes['gamesToAdd'].currentValue.length > 0){
      this.games = [...this.games, ...this.gamesToAdd];
    }
    console.log(this.games)
  }


}
