import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GameCreator, GameItem } from '../../models/game.item.model';
import { CREATORS } from '../../data/game.storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent {
  @Output() volverAtras = new EventEmitter<void>;

  volverAView(){
    this.volverAtras.emit();
  }

  creatorsList : GameCreator[] = CREATORS;


  game : GameItem = {
    id: "1",
    name: "",
    description: "",
    creation: new Date(),
    creators: []
  }

  creatorNew : GameCreator = {
    name: "",
    iconUrl: ""
  }

  @Output() onSavedFile = new EventEmitter<GameItem>();

  save(form : NgForm){
    if(form.invalid){
      alert("Form invalido")
      return;
    }

    const selectedCreator = this.creatorsList.find(creator => creator.name === this.creatorNew.name);
    if(selectedCreator){
      this.game.creators.push(selectedCreator);
    }

    const gameToEmit = {
      ...this.game,
      creators: [...this.game.creators]
    };
    
    console.log(this.creatorNew)
    console.log(gameToEmit)
    this.onSavedFile.emit(gameToEmit)
    this.creatorNew = { name: "", iconUrl: "" };
    form.resetForm()
  }

}
