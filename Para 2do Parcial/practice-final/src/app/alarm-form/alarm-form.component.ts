import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HomesafeService } from '../services/homesafe.service';
import { AlarmStatus, AlarmZone, User } from '../models/models';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-alarm-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alarm-form.component.html',
  styleUrl: './alarm-form.component.css'
})
export class AlarmFormComponent implements OnInit {
  private alarmService: HomesafeService = inject(HomesafeService)
  private loginService: LoginService = inject(LoginService)
  private router: Router = inject(Router)

  userLogged: User = { email: '', password: '', id: '' };
  alarmZones: AlarmZone[] = [];


  reactiveFormMode: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5)]), 
    //Que el nombre no exista async?
    userId: new FormControl(""),
    creationDate: new FormControl(new Date()),
    zones: new FormArray([],[Validators.required, this.uniqueZoneValidator]),
  });

  ngOnInit(): void {

    this.reactiveFormMode.get('name')?.setAsyncValidators(this.alarmModeNameExistsValidator()); 

    this.userLogged = this.loginService.getUserLogin();

    this.alarmService.getAlarmZones().subscribe({
      next: (response) =>{
        this.alarmZones = response;
      },
      error: (error) => {
        console.error('Error al cargar zonas', error);
      }
    })
  }

  get zones(){
    return this.reactiveFormMode.controls["zones"] as FormArray;
  }

  onNewZone() {
    const formArray = this.reactiveFormMode.get('zones') as FormArray;
    const zoneForm = new FormGroup({
      id: new FormControl("", Validators.required), // Agrega validación requerida
      name: new FormControl("") // Puedes agregar validaciones si lo necesitas
    });
  
    formArray.push(zoneForm);
  }

  onDeleteZone(index: number){
    this.zones.removeAt(index);
  }

  save(){
    this.reactiveFormMode.value.userId = this.userLogged.id

    this.alarmService.postAlarmMode(this.reactiveFormMode.value).subscribe({
      next: (response) =>{
        console.log("Enviado correctamente: " + this.reactiveFormMode.value)
        const status: AlarmStatus = {
          id:101,
          isActive: true,
          userId: this.userLogged.id
        }
        this.alarmService.postStatusMode(status).subscribe({
          next: (response) =>{
              console.log("Actualizado el estado correctamente");
              this.router.navigate(['home/panel'])
          },
          error: (error) => {
            console.error('Error al cargar estado', error);
          }
        })
      },
      error: (error) => {
        console.error('Error al cargar el modo', error);
      }
    })
  }
  
  return(){
    this.router.navigate(['/home/panel'])
  }

  uniqueZoneValidator(zones: FormArray): ValidationErrors | null{
    const selectedZoneId = zones.controls.map(control =>
      control.get('id')?.value as Number);
    const hasDuplicates = selectedZoneId.some((id, index) => 
      selectedZoneId.indexOf(id) !==index
    );
    return hasDuplicates ? { duplicateZone:true } : null
  }

  alarmModeNameExistsValidator(): AsyncValidatorFn | null {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.alarmService.getAlarmModesByName(control.value).pipe(
        map(data => {
          return data.length > 0 ? {nameLimit : true} : null
        }),
        catchError(() => {
          alert("Error en la api")
          return of({apiCaida : true})
        })
      );
    };
  }

  onValidate(controlName: string) {
    const control = this.reactiveFormMode.get(controlName);
    return {
      'is-invalid': control?.invalid && (control?.dirty || control?.touched),
      'is-valid': control?.valid
    }
  }
}
