import { Component, OnInit } from '@angular/core';
import { ChatMensajesComponent } from '../chat-mensajes/chat-mensajes.component';
import { Mensajes } from '../../interfaces/mensajes';
import { DirectPersDirective } from '../direct-pers.directive';
import { CleanChatDirective } from '../clean-chat.directive';
import { FirstMayusPipe } from '../first-mayus.pipe';

@Component({
  selector: 'app-chat-sala',
  standalone: true,
  imports: [ChatMensajesComponent, DirectPersDirective, CleanChatDirective, FirstMayusPipe],
  templateUrl: './chat-sala.component.html',
  styleUrl: './chat-sala.component.css'
})
export class ChatSalaComponent implements OnInit{
    mensajes : Mensajes[] = [];

    ngOnInit(): void {
      //Mensajes para probar que trae bien las cosas
      this.mensajes = []
    }

    agregarMensaje(nuevoMensaje: Mensajes){
      this.mensajes.push(nuevoMensaje) //Traigo el nuevo mensaje a mi lista
    }
}
