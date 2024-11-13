import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Booking, BookingService, Service, Venue } from '../interfaces';
import { BookingsService } from '../bookings.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { timeRangeValidator } from '../validators/range.validator';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent implements OnInit{

  private bookingService: BookingsService = inject(BookingsService);
  private router: Router = inject(Router);
  subtotal: number = 0;
  total: number = 0;
  descuentoValue: number=0;
  descuento: boolean = false;

  reactiveForm:FormGroup = new FormGroup({
    companyName: new FormControl("", [Validators.required, Validators.minLength(5)]),
    companyEmail: new FormControl("", [Validators.required, Validators.email]), //Validar API
    contactPhone: new FormControl("", [Validators.required]),
    venueId: new FormControl("", [Validators.required]),
    eventDate: new FormControl("", [Validators.required]),
    startTime: new FormControl("", [Validators.required]),
    endTime: new FormControl("", [Validators.required]),
    totalPeople: new FormControl("", [Validators.required]),
    services: new FormArray([],[Validators.required])
  })

  ngOnInit(): void {
    //Ver value

    this.reactiveForm.get('eventDate')?.setAsyncValidators(this.dateEventValidator());  

    this.chargeSelectVenues();
  }

  get services() {
    return this.reactiveForm.controls["services"] as FormArray;
  }

  onNewEvent() {
    const formArray = this.reactiveForm.controls["services"] as FormArray;
    const eventForm = new FormGroup({
      serviceId: new FormControl("", [Validators.required]), //Select API
      quantity: new FormControl("", [Validators.required, Validators.min(10)]),
      pricePerPerson: new FormControl("", [Validators.required]), 
      startTime: new FormControl("", [Validators.required]),
      endTime: new FormControl("", [Validators.required]),
    },
    { validators: timeRangeValidator } // Aplica el validador personalizado aquí
  );

    eventForm.get("serviceId")?.valueChanges.subscribe((selectedValue) => {
      this.calculateTotal();
      this.updatePricePerPerson(eventForm, selectedValue);
    });

    eventForm.get("quantity")?.valueChanges.subscribe((selectedValue) => {
      this.calculateTotal();
    });

    formArray.push(eventForm);
    this.chargeSelect()
  }

  updatePricePerPerson(eventForm: FormGroup, selectedServiceId: string | null) {
    const selectedService = this.selectServices.find(service => service.id === selectedServiceId);
  
    if (selectedService) {
      eventForm.get("pricePerPerson")?.setValue(selectedService.pricePerPerson);
    }
  
  }

  calculateTotal(): void{

    this.services.controls.forEach(control =>{
      const quantity = control.get('quantity')?.value || 0;
      const pricePerPerson = control.get('pricePerPerson')?.value || 0;
      this.subtotal += quantity * pricePerPerson
      if(quantity > 100){
        this.descuento = true;
      }
      else{this.descuento = false}
    })
    if(this.descuento){
      this.total = this.descuento ? this.subtotal * 0.85 : this.subtotal;
      this.descuentoValue = this.descuento ? this.subtotal * 0.15 : 0;
    }
    else{
      this.descuentoValue = 0
    }
  }

  onDeleteEvent(index: number) {
    this.services.removeAt(index);
  }

  selectServices:any[] = [];
  chargeSelect(){
    this.bookingService.getServices().subscribe({
      next: (response) => {
        this.selectServices = response;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
  }

  selectVenues:Venue[] = [];
  chargeSelectVenues(){
    this.bookingService.getVenues().subscribe({
      next: (response) => {
        this.selectVenues = response;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
  }

  save(){
    const booking: Booking = this.reactiveForm.value;
    booking.bookingCode = Math.random().toString(36).substring(2).toUpperCase();
    booking.status = 'pending';
    booking.createdAt = new Date();
    booking.totalAmount = this.subtotal;

    this.bookingService.postBooking(booking).subscribe({
      next: (response) => {
        console.log('Orden enviada correctamente', response);
        this.router.navigate(['/bookings']);
      },
      error: (error) => {
        console.error('Error al enviar la orden', error);
      }
    });
  }


  onValidate(controlName: string) {
    const control = this.reactiveForm.get(controlName);
    return {
      'is-invalid': control?.invalid && (control?.dirty || control?.touched),
      'is-valid': control?.valid
    }
  }

  onValidateFrmAr(index: number, controlName: string) {
    const controlArray = this.reactiveForm.get('services') as FormArray;
  
    if (controlArray && controlArray.at(index)) {
        const control = controlArray.at(index).get(controlName);
        return {
            'is-invalid': control?.invalid && (control?.dirty || control?.touched),
            'is-valid': control?.valid
        };
    }
    return {};
  }

  dateEventValidator(): AsyncValidatorFn | null{
    return (control: AbstractControl) : Observable<ValidationErrors | null> => {
      return this.bookingService.getAvabilityByDate(control.value).pipe(
        map(data =>{
          console.log(data)
          let disponibilidad = null;
          data.forEach(disp =>{
            console.log(disp)
            if(control.value == disp.date){
               disponibilidad = false
            }
            else disponibilidad = true
          })
          return disponibilidad === false ? {dateOccuped : true} : null
        })
      )
    }
  }

}