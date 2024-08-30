import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-match-info',
  standalone: true,
  imports: [],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.css'
})
export class MatchInfoComponent implements OnDestroy {
  @Input() match: string = ''; //Entrada del padre al hijo
  @Output() selected = new EventEmitter<string>(); //Salida del hijo al padre, ess de tipo strinng

  mostrarPartido() {
    this.selected.emit(this.match); //Le envio la info de string para emitirla
  }

  //Uso de OnDestroy para mostrar un alerta cuando se destruye el componente
  ngOnDestroy(): void {
    alert('MatchInfoComponent destruido');
  }
}
