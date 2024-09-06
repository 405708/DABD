import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstMayus',
  standalone: true
})
export class FirstMayusPipe implements PipeTransform {

  //Cambiar a que solo la primera sea mayus
  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
