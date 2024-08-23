import { Component } from '@angular/core';
import { MatchSelectorComponent } from '../match-selector/match-selector.component'; //mucho muy importante

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [MatchSelectorComponent], // mucho muy importante para q se importe correctamente el component
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {
  texto: string = 'Hola Mundo';
  textoMasivo: string = '';

  cambiarTexto() {
    this.texto = 'Chau Mundo';
  }

  tecleoMasivo(event: any) {
    console.log(event.target.value);
    this.textoMasivo = event.target.value;
  }
}
