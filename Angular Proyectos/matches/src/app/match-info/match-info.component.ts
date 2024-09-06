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
  @Input() local: string = ''; //Entrada del padre al hijo
  @Input() visitante: string = '';
  @Input() date?: Date;
  @Input() resultlocal?: number;
  @Input() resultvisit?: number;

  @Output() selected = new EventEmitter<string>(); //Salida del hijo al padre, ess de tipo strinng

  mostrarPartido() {
    this.selected.emit(this.local + ' vs ' + this.visitante); //Le envio la info de string para emitirla
  }

  //Uso de OnDestroy para mostrar un alerta cuando se destruye el componente
  ngOnDestroy(): void {
    alert('MatchInfoComponent destruido');
  }
}
