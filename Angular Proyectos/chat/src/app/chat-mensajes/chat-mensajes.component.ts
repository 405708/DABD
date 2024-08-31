import { Component, EventEmitter, Output } from '@angular/core';
import { Mensajes } from '../../interfaces/mensajes';

@Component({
  selector: 'app-chat-mensajes',
  standalone: true,
  imports: [],
  templateUrl: './chat-mensajes.component.html',
  styleUrl: './chat-mensajes.component.css'
})
export class ChatMensajesComponent {
  @Output() mensaje = new EventEmitter<Mensajes>()

  nuevoMensaje(name:string){
    var textAreaValue = ""
    if(name == "Martin"){
      textAreaValue = (document.getElementById('martinarea') as HTMLTextAreaElement).value;
    }
    else {textAreaValue = (document.getElementById('francoarea') as HTMLTextAreaElement).value;}
    
    const mensajeNuevo : Mensajes = {
      nombre: name,
      texto: textAreaValue
    };

    this.mensaje.emit(mensajeNuevo)
  }


}
