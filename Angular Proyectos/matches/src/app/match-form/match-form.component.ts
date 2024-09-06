import { Component, EventEmitter, Output } from '@angular/core';
import { Match } from '../interfaces/match';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-match-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.css'
})
export class MatchFormComponent {
  match: Match = {
    local: '',
    visitante: '',
    resultlocal: 0,
    resultvisit: 0
  };

  @Output() onSavedMatch = new EventEmitter<Match>();

  save(form: NgForm) {
    if (form.invalid) {
      alert('Formulario inválido');
      return;
    }
    this.onSavedMatch.emit(form.value);
    console.log(form.value);
    form.resetForm();
  }
}