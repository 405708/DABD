import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { OWNERS } from '../../data/file.storage';

@Component({
  selector: 'app-file-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './file-form.component.html',
  styleUrl: './file-form.component.css'
})
export class FileFormComponent {

  FileType = FileType; //No me deja usar el ngValue sin esto

  @Output() volverAtrasEvent = new EventEmitter<void>();

  volverAtras() {
    this.volverAtrasEvent.emit();
  }

  //Creo uno por default
  file : FileItem = {
    id: '',
    name: '',
    creation: new Date,
    type: FileType.FOLDER,
    owners: []
  }

  /*ownerForm : FileOwner = {
    name : "",
    avatarUrl : ""
  }*/

  //ownersT : FileOwner[] = OWNERS;

  

  @Output() onSavedFile = new EventEmitter<FileItem>();

  //Revisar como asignar el tipo al enviarlo
  save(form: NgForm) {
    if (form.invalid) {
      alert('Formulario inválido');
      return;
    }
    //Revisa que exista y lo añade si no esta
    /*if (this.ownerForm) {
      this.file.owners.push(this.ownerForm);
      console.log(this.file.owners)
    }*/
    this.onSavedFile.emit(form.value);
    console.log(form.value);
    form.resetForm();
    //this.file.owners = [];
  }

}
