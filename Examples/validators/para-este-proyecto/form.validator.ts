import { AbstractControl, FormArray, FormControl, ValidationErrors } from "@angular/forms";

export class FormValidator{
    //validacion sobre el formArray
    static NoDuplicateZones(control: AbstractControl): ValidationErrors | null {
        
        if (!(control instanceof FormArray)) {
            return null;
        }

        const formArray = control as FormArray;

        const selectedItems = formArray.controls.map(
            control => control.get('zona')?.value as string
        );

        const hasDuplicates = selectedItems.some(
            (id, index) => selectedItems.indexOf(id) !== index
        );

        if(hasDuplicates){
            console.log("duplicated: true");
            return{
                duplicate: true
            };
        }

        console.log("duplicated: false");
        return null;
    }
}