import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-match-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.css'
})
export class MatchInfoComponent implements OnDestroy {
  @Input() index?: number;
  @Input() local: string = ''; //Entrada del padre al hijo
  @Input() visitante: string = '';
  @Input() date?: Date;
  @Input() resultlocal?: number;
  @Input() resultvisit?: number;

  @Output() selected = new EventEmitter<number>(); //Salida del hijo al padre, ess de tipo strinng

  mostrarPartido() {
    this.selected.emit(this.index); //Le envio la info de string para emitirla
  }

  ngOnChanges() {
    console.log('Cambio en el componente MatchInfoComponent');
  }

  //Uso de OnDestroy para mostrar un alerta cuando se destruye el componente
  ngOnDestroy(): void {
    alert('MatchInfoComponent destruido');
  }
}
