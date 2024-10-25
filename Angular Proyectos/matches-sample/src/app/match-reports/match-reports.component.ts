import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateValidator } from '../validators/date.validator';

@Component({
  selector: 'app-match-reports',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './match-reports.component.html',
  styleUrl: './match-reports.component.css'
})
export class MatchReportsComponent implements OnInit {
  dateControl = new FormControl(
    '2004-10-02',
     [
      Validators.required, 
      DateValidator.greaterThanToday
    ]
    );

    //Para conocer el valor del formControl cvada vez que cambia, se usa para combos en cascada
    ngOnInit(): void {
      this.dateControl.valueChanges.subscribe({
        next: (value) => {
          console.log(value);
      }
      });
    }
}
