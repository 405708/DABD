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
    if(this.numero2 === 0){
      alert('No se puede dividir por 0');
    }
    else{
      const resultado = this.numero1 / this.numero2;
      this.resultadoObtenido.emit(resultado);
    }
  }
  borrar(){
    this.borrarNumeros.emit();
  }
  potencia(){
    const resultado = Math.pow(this.numero1, this.numero2);
    this.resultadoObtenido.emit(resultado);
  }
  raiz(){
    const resultado = Math.sqrt(this.numero1);
    this.resultadoObtenido.emit(resultado);
  }

}
