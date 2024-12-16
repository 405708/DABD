import { AbstractControl, FormArray, FormControl, ValidationErrors } from "@angular/forms";

export class MiscDateValidator{

  //Valida que la hora inicio sea menor que la hora fin
  static horaInicioMenorQueFin(horaInicioControl: string, horaFinControl: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const horaInicio = formGroup.get(horaInicioControl);
      const horaFin = formGroup.get(horaFinControl);

      if (!horaInicio || !horaFin) { return null; }
      // Si alguno de los campos está vacío, no validamos
      if (!horaInicio.value || !horaFin.value) { return null; }

      const minutosInicio = this.convertirHoraAMinutos(horaInicio.value);
      const minutosFin = this.convertirHoraAMinutos(horaFin.value);

      if (minutosInicio >= minutosFin) {
        //console.log("horaInicioMayorQueFin: true")
        return { horaInicioMayorQueFin: true };
      }
      return null;
    };
  }


  //Valida que la hora fin sea mayor que la hora inicio
  static horaFinMayorQueInicio(horaInicioControl: string, horaFinControl: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const horaInicio = formGroup.get(horaInicioControl);
      const horaFin = formGroup.get(horaFinControl);

      if (!horaInicio || !horaFin) { return null; }
      // Si alguno de los campos está vacío, no validamos
      if (!horaInicio.value || !horaFin.value) { return null; }
      const minutosInicio = this.convertirHoraAMinutos(horaInicio.value);
      const minutosFin = this.convertirHoraAMinutos(horaFin.value);

      if (minutosFin <= minutosInicio) {
        console.log("horaFinMenorQueInicio: true")
        return { horaFinMenorQueInicio: true };
      }

      return null;
    };
  }

  private static convertirHoraAMinutos(hora: string): number {
    const [horas, minutos] = hora.split(':').map(Number);
    return (horas * 60) + minutos;
  }
}