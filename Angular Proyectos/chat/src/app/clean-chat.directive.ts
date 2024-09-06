import { Directive, Host, HostListener, Optional } from '@angular/core';
import { ChatSalaComponent } from './chat-sala/chat-sala.component';

@Directive({
  selector: '[appCleanChat]',
  standalone: true
})
export class CleanChatDirective {

  //Le digo que voy a modificar un componente de tipo chat-sala
  constructor(@Host() @Optional() private chatSalaComponent: ChatSalaComponent) { }

  @HostListener('click') onClick() {
    if (this.chatSalaComponent) {
      this.chatSalaComponent.mensajes = [];
    }
  }
  //Este es de prueba
  //generame un evento que al hacer doble click se agregen 50 mensajes diciendo hola
  @HostListener('dblclick') onDblClick() {
    if (this.chatSalaComponent) {
      for (let i = 0; i < 50; i++) {
        this.chatSalaComponent.mensajes.push({ nombre: 'Hacker', texto: 'Fuiste hackeado por el prestigio!' , fecha: new Date() });
      }
    }
  }
}
