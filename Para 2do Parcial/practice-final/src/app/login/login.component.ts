import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../models/models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginService: LoginService = inject(LoginService)
  private router: Router = inject(Router)
  user: User[] = [];

  reactiveForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, this.passwordCharacterSpecialValidator()])
  });

  passwordCharacterSpecialValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // No se valida si el campo está vacío
      }

      const password = control.value;

      // Validación para al menos 10 caracteres
      const hasMinLength = password.length >= 10;

      // Validación para al menos una letra mayúscula
      const hasUpperCase = /[A-Z]/.test(password);

      // Validación para al menos una letra minúscula
      const hasLowerCase = /[a-z]/.test(password);

      // Validación para al menos un carácter especial
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      // Si no cumple alguna de las condiciones, retornamos un error
      const valid = hasMinLength && hasUpperCase && hasLowerCase && hasSpecialCharacter;

      return valid ? null : { passwordInvalid: true };
    };
  }

  // Método de submit para probar el formulario
  onSubmit() {
    this.loginService.getUsers().subscribe({
      next: (response) => {
        console.log("Existen usuarios")
        this.user = response.filter(r => r.email == this.reactiveForm.value.email && r.password == this.reactiveForm.value.password)
        if(this.user.length > 0){
          this.loginService.setUserLogin(this.user[0])
          this.router.navigate(['/home'])
        }
      },
      error: (error) => {
        console.error('Error al buscar usuarios', error);
      }
    })
  }

  onValidate(controlName: string) {
    const control = this.reactiveForm.get(controlName);
    return {
      'is-invalid': control?.invalid && (control?.dirty || control?.touched),
      'is-valid': control?.valid
    }
  }
}
