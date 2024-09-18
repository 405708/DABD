import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FILE_LIST, OWNERS } from '../../data/file.storage';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../sort.pipe';

@Component({
  selector: 'app-file-view',
  standalone: true,
  imports: [CommonModule, SortPipe],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.css'
})
export class FileViewComponent {
@Input() selectedAction:string='0';

  @Input() filesToAdd : FileItem[] = [];

  @Output() files : FileItem[] = FILE_LIST;
  @Output() owners : FileOwner[] = OWNERS;
  @Output() folder : FileType = FileType.FOLDER;
  @Output() filetype : FileType = FileType.FILE;

  toDeleteItems : string[] = []

  isChecked : boolean = false;

  onCheckedChange(event: Event) {
    const checkBox = event.target as HTMLInputElement;
    this.isChecked = checkBox.checked;
    if(this.isChecked){
      //Añade a una lista para borrarlos
      this.toDeleteItems.push(checkBox.id) 
    }
    else {
      //Si le quita el check lo borra de la lista
      this.toDeleteItems = this.toDeleteItems.filter(item => item !== checkBox.id)
    } 
    console.log(this.toDeleteItems); //para ver que ande bien je
  }

  //Si cambia el select y el valor es 2 entonces
  // borro los items que ya guarde previamente en la lista toDeleteItems
  ngOnChanges(changes : SimpleChanges){
    if(this.selectedAction === '2'){
      this.onDelete();
    }
    if(changes['filesToAdd'] && changes['filesToAdd'].currentValue.length > 0){
      this.files = [...this.files, ...this.filesToAdd];
    }
  }

  //Saca los items que incluyan los id que estan en toDeleteItems 
  //para dejar los archivos de ambos tipos que no fueron seleccionados por mi
  onDelete() {
    let confirmacion = true;
    if(this.toDeleteItems.length > 1){
      //Salta un alert que te devuelve true o false
      confirmacion = confirm('¿Estás seguro de que quieres borrar los archivos?');
    }
    if(confirmacion){
      this.files = this.files.filter(file => !this.toDeleteItems.includes(file.id));
      console.log('Archivos restantes:', this.files);
      this.toDeleteItems = [];
    }
  }

}
