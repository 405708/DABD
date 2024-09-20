import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desc',
  standalone: true
})
export class DescPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value;
    return "Descripcion: " + value.toUpperCase() + " - Letras: " +  value.length
  }

}
