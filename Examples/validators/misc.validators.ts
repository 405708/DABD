import { AbstractControl, FormArray, FormControl, ValidationErrors } from "@angular/forms";

export class MiscValidator{
    //validacion sobre el FORMARRAY 
    //q no haya 2 items/atributo iguales en el formArray
    static NoDuplicate(control: AbstractControl): ValidationErrors | null {
        const formArray = control as FormArray;
        if (!(control instanceof FormArray)) { return null; }

        const selectedItems = formArray.controls.map(
            control => control.get('formControl del array')?.value as string
        );
        const hasDuplicates = selectedItems.some(
            (id, index) => selectedItems.indexOf(id) !== index
        );

        if(hasDuplicates){ return{ duplicate: true }; }
        return null;
    }


    //minimo de items en el formArray
    static OneMinimum(control: AbstractControl): ValidationErrors | null {
        const formArray = control as FormArray;
        if (!(control instanceof FormArray)) { return null; }

        if (formArray.length < 1) { return { zeroProducts: true }; }
        return null;
    }

    //maximo de items en un formArray
    static TenProductsMaximum(control: AbstractControl): ValidationErrors | null {
        const formArray = control as FormArray;
        if (!(control instanceof FormArray)) { return null; }

        if (formArray.length > 10) { return { overTenProducts: true }; }
        return null;
    }
    //FIN validaciones FORMARRAY

    //validacion de un formato especifico 
    static validateEmailFormat(control: FormControl): ValidationErrors | null {
        const email: string = control.value;
        const formatEmail = email.substring(email.length - 12, email.length); 

        if (email.length < 13 || formatEmail != "@homesafe.io") {
            return { invalidEmail: true };
        }
        return null;
    }

    //validacion de formato (RegEx)
    static validatePasswordFormat(control: FormControl): ValidationErrors | null {
        const password: string = control.value;
        if (password.length <= 10) {
            return { invalidPassword: true };
        }
        // verifica si tiene al menos una mayus, una minus y un caracter especial
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
        if (!regex.test(password)) {
            return { invalidPassword: true };
        }
        return null;
    }



}