import { Component } from '@angular/core';

@Component({
  selector: 'app-calc-actions',
  standalone: true,
  imports: [],
  templateUrl: './calc-actions.component.html',
  styleUrl: './calc-actions.component.css'
})
export class CalcActionsComponent {
  sumar(){
    console.log('Sumar');
  }
  restar(){
    console.log('Restar');
  }
  multiplicar(){
    console.log('Multiplicar');
  }
  dividir(){
    console.log('Dividir');
  }
}
