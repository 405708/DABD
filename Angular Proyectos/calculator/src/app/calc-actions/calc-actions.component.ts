import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calc-actions',
  standalone: true,
  imports: [],
  templateUrl: './calc-actions.component.html',
  styleUrls: ['./calc-actions.component.css']
})
export class CalcActionsComponent {

  @Input() numero1:number = 0;
  @Input() numero2:number = 0;
  @Output() resultadoObtenido = new EventEmitter<number>();
  @Output() borrarNumeros = new EventEmitter<void>();

  sumar(){
    const resultado = this.numero1 + this.numero2;
    console.log(resultado)
    this.resultadoObtenido.emit(resultado);
  }
  restar(){
    const resultado = this.numero1 - this.numero2;
    this.resultadoObtenido.emit(resultado);
  }
  multiplicar(){
    const resultado = this.numero1 * this.numero2;
    this.resultadoObtenido.emit(resultado);
  }
  dividir(){
    const resultado = this.numero1 / this.numero2;
      this.resultadoObtenido.emit(resultado);
  }
  borrar(){
    this.borrarNumeros.emit();
  }
}
