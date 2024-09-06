import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDirectPers]',
  standalone: true
})
export class DirectPersDirective {

  constructor(private el: ElementRef) { }

  @HostListener('dblclick') onDblClick() {
    this.resaltar('greenyellow');
    this.modificar();
  }

  @HostListener('click') onClick() {
    this.ocultarOmostrar();
  }

  private resaltar(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private modificar(){
    if(this.el.nativeElement.style.fontSize == "50px"){
      this.el.nativeElement.style.fontSize = "17px"
      this.el.nativeElement.style.backgroundColor = 'white';
    }
    else this.el.nativeElement.style.fontSize = "50px"
  }

  private ocultarOmostrar(){
    if(this.el.nativeElement.style.opacity == '0'){
      this.el.nativeElement.style.opacity = '1';
    }
    else {
      this.el.nativeElement.style.opacity = '0';
      this.el.nativeElement.style.fontSize = "17px";
      this.el.nativeElement.style.backgroundColor = 'white';
    }
    
  }

}
