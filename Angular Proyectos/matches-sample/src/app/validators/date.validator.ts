import { FormControl, ValidationErrors } from "@angular/forms";

export class DateValidator{
  static greaterThanToday(control: FormControl): ValidationErrors | null {
    const date = new Date(control.value);
if (date > new Date()) {
      return { greaterThanToday: true };
    }
    return null;
  }
}