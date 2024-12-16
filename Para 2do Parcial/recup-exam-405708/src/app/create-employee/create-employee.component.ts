import { Component, inject, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Department, Relative, RELATIVESExists } from '../interfaces';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

  private employeesService:EmployeesService = inject(EmployeesService)
  private router:Router = inject(Router)

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm.get('dni')?.setAsyncValidators(this.dniExistsValidator()); 
    this.chargeSelect();
  }

  reactiveForm:FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    dni: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]), //Validacion Async
    departamentId: new FormControl("", [Validators.required]),
    baseSalary: new FormControl("", [Validators.required, Validators.min(0)]),
    relatives: new FormArray([])
  })

  get relatives() {
    return this.reactiveForm.controls["relatives"] as FormArray;
  }
  onNewEvent() {
    const formArray = this.reactiveForm.controls["relatives"] as FormArray;
    const eventForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      relationship: new FormControl("", [Validators.required]), //Select
      dni: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]), 
      birthDate: new FormControl("", [Validators.required]),
    }
  );
    formArray.push(eventForm);
  }

  onDeleteEvent(index: number) {
    this.relatives.removeAt(index);
  }

  selectDept:Department[] = [];
  chargeSelect(){
    this.employeesService.getDepartaments().subscribe({
      next: (response) => {
        this.selectDept = response;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
  }

  selectRelatives: RELATIVESExists[] = Object.values(RELATIVESExists); //ENUM TIPOS

  onValidate(controlName: string) {
    const control = this.reactiveForm.get(controlName);
    return {
      'is-invalid': control?.invalid && (control?.dirty || control?.touched),
      'is-valid': control?.valid
    }
  }

  onValidateFrmAr(index: number, controlName: string) {
    const controlArray = this.reactiveForm.get('relatives') as FormArray;
  
    if (controlArray && controlArray.at(index)) {
        const control = controlArray.at(index).get(controlName);
        return {
            'is-invalid': control?.invalid && (control?.dirty || control?.touched),
            'is-valid': control?.valid
        };
    }
    return {};
  }

  save(){
    if(this.reactiveForm.valid){
      this.employeesService.postEmployee(this.reactiveForm.value).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      })
    }
  }



  dniExistsValidator(): AsyncValidatorFn | null {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.employeesService.getEmployeesByDni(control.value).pipe(
        map(data => {
          let exists = null;
          if (data.length === 0) {
            exists = { dniNotExists: true };
          }
          return exists;
        }),
        catchError(() => {
          return of({ dniNotExists: true });
        })
      );
    };
  }

}
