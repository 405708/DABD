import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileItem, FileType } from '../../models/file.item.model';

@Component({
  selector: 'app-file-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './file-form.component.html',
  styleUrl: './file-form.component.css'
})
export class FileFormComponent {
  @Output() volverAtrasEvent = new EventEmitter<void>();

  volverAtras() {
    this.volverAtrasEvent.emit();
  }

  @Output() onSavedFile = new EventEmitter<FileItem>();

  //Creo uno por default
  file : FileItem = {
    id: '',
    name: '',
    creation: new Date,
    type: FileType.FOLDER,
    owners: []
  }

  //Revisar como asignar el tipo al enviarlo
  save(form: NgForm) {
    if (form.invalid) {
      alert('Formulario inválido');
      return;
    }
    this.onSavedFile.emit(form.value);
    console.log(form.value);
    form.resetForm();
  }

}
