import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const timeRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startTime = control.get('startTime')?.value;
  const endTime = control.get('endTime')?.value;

  return startTime && endTime && startTime >= endTime ? { timeRangeInvalid: true } : null;
};