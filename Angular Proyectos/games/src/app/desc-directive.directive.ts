import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDescDirective]',
  standalone: true
})
export class DescDirectiveDirective {

  constructor(private el : ElementRef) { 
  }

  @HostListener('dblclick') onDblClick(){
    this.modificar();
  }

  
  private modificar(){
    this.el.nativeElement.style.color = 'antiquewhite';
    if(this.el.nativeElement.style.fontSize == "30px"){
      this.el.nativeElement.style.fontSize = "17px"
    }
    else this.el.nativeElement.style.fontSize = "30px"
  }

  @HostListener('click') onClick(){
    this.ocultar();
  }

  private ocultar(){
    if(this.el.nativeElement.style.opacity == '0'){
      this.el.nativeElement.style.opacity = '1';
    }
    else {
      this.el.nativeElement.style.opacity = '0';
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.border = '5px solid green';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.border = '1px black';
  }

}
