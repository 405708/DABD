import { FormControl, ValidationErrors } from "@angular/forms";

export class LoginValidator {

    //- **Email**: Debe tener el siguiente formato: `usuario@homesafe.io`.
    static validateEmailFormat(control: FormControl): ValidationErrors | null {
        const email: string = control.value;
        const formatEmail = email.substring(email.length - 12, email.length); 

        if (email.length < 13 || formatEmail != "@homesafe.io") {
            //console.log("email invalido, length: ", email.length);
            if(email.length >= 13){
                //console.log("email invalido, formato dps de @: ", formatEmail);
            }
            return {
                invalidEmail: true
            };
        }
        //console.log("email valido!!!");
        return null;
    }

    //- **Contraseña**: Debe cumplir con las siguientes condiciones:
    // - Al menos 10 caracteres.
    // - Contar con 1 mayúscula.
    // - Contar con 1 minúscula.
    // - Contar con al menos 1 carácter especial.
    static validatePasswordFormat(control: FormControl): ValidationErrors | null {
        const password: string = control.value;
        if (password.length <= 10) {
            //console.log("contraseña invalida, length: ", password.length);
            return {
                invalidPassword: true
            };
        }

        // verifica si contiene al menos una mayúscula, una minúscula y un carácter especial
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
        if (!regex.test(password)) {
            //console.log("Contraseña inválida, no cumple con los requisitos de formato.");
            return {
                invalidPassword: true,
            };
        }
        //console.log("contraseña valida!!!");
        return null;
    }
}
