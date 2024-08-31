import { Component, OnInit } from '@angular/core';
import { ChatMensajesComponent } from '../chat-mensajes/chat-mensajes.component';
import { Mensajes } from '../../interfaces/mensajes';

@Component({
  selector: 'app-chat-sala',
  standalone: true,
  imports: [ChatMensajesComponent],
  templateUrl: './chat-sala.component.html',
  styleUrl: './chat-sala.component.css'
})
export class ChatSalaComponent implements OnInit{
    mensajes : Mensajes[] = [];

    ngOnInit(): void {
      this.mensajes = [
        {nombre: "Martin", texto: "Hola!"},
        {nombre: "Franco", texto: "Buenas!"}
      ]
    }

    agregarMensaje(nuevoMensaje: Mensajes){
      this.mensajes.push(nuevoMensaje) //Traigo el nuevo mensaje a mi lista
    }



}
