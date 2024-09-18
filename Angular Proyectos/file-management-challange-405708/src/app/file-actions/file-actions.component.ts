import { Component, EventEmitter, Output } from '@angular/core';
import { FileViewComponent } from '../file-view/file-view.component';
import { FileFormComponent } from '../file-form/file-form.component';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../models/file.item.model';

@Component({
  selector: 'app-file-actions',
  standalone: true,
  imports: [FileViewComponent, FileFormComponent, CommonModule],
  templateUrl: './file-actions.component.html',
  styleUrl: './file-actions.component.css'
})
export class FileActionsComponent {

  selectedAction: string = '0';

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedAction = selectElement.value;
  }

  volverAtras() {
    this.selectedAction = '0';
  }

  filesToAdd: FileItem[] = [];
  addNewFile(file : FileItem){
    this.filesToAdd.push(file);
  }
 
}
