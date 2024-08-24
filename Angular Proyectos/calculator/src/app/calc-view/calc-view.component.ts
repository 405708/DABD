import { Component } from '@angular/core';
import { CalcActionsComponent } from '../calc-actions/calc-actions.component';

@Component({
  selector: 'app-calc-view',
  standalone: true,
  imports: [CalcActionsComponent],
  templateUrl: './calc-view.component.html',
  styleUrls: ['./calc-view.component.css']
})
export class CalcViewComponent {
  numero1:number = 0;
  numero2:number = 0;

  //Tuve que buscar como hacer esto para los inputs de tipo number, 
  //para actualizar el valor cuando cambia
  updateNumero1(event: Event) {
    const input = event.target as HTMLInputElement;
    this.numero1 = parseFloat(input.value) || 0;
  }

  updateNumero2(event: Event) {
    const input = event.target as HTMLInputElement;
    this.numero2 = parseFloat(input.value) || 0;
  }
  
  resultadoOperacion: number = 0;
  onOperation(resultado:number){
    this.resultadoOperacion = resultado
  }

  onBorrarNumeros(){
    this.numero1 = 0;
    this.numero2 = 0;
    this.resultadoOperacion=0;
  }

}
