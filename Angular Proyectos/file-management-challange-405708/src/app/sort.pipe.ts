import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  //Para acomodar la lista de string del nombre
  transform(array: any[], field: string): any[] {
    if (!array) return [];
    return array.sort((a, b) => a[field].localeCompare(b[field]));
  }

}
