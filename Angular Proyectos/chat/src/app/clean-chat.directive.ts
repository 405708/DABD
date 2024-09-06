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
}
