import { Element } from '@angular/compiler';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appView]',
  standalone: true
})
export class ViewDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.key === 'F' || event.key === 'f') {
      console.log('La tecla "F" fue presionada');
      this.el.nativeElement.style.border = '2px solid red'; // Cambia el fondo al presionar "F"
    }
  }

  @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
    if (event.key === 'F' || event.key === 'f') {
      console.log('La tecla "F" fue liberada');
      this.el.nativeElement.style.border = '';// Restablece el fondo al soltar "F"
    }
  }

}
