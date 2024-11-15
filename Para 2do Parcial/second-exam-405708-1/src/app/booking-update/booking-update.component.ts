import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Booking, BookingService, Venue } from '../interfaces';
import { BookingsService } from '../bookings.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './booking-update.component.html',
  styleUrl: './booking-update.component.css'
})
export class BookingUpdateComponent implements OnInit {
  @Input() indexToUpdate: string = '';
  @Output() updateConfirmed = new EventEmitter<string>();
  private bookingService: BookingsService = inject(BookingsService)
  private router: Router = inject(Router)
  bookingToUpdate?: Booking;

  constructor(){
  }

    //SI PIDE OUTPUT E INPUT
  ngOnInit(): void {
    this.chargeBooking()
    this.chargeFormArrays()
    this.chargeSelect()
    this.chargeSelectVenues()
  }

  reactiveForm:FormGroup = new FormGroup({
    companyName: new FormControl(this.bookingToUpdate?.companyName, [Validators.required, Validators.minLength(5)]),
    companyEmail: new FormControl("", [Validators.required, Validators.email]), //Validar API
    contactPhone: new FormControl("", [Validators.required]),
    venueId: new FormControl("", [Validators.required]),
    eventDate: new FormControl("", [Validators.required]),
    startTime: new FormControl("", [Validators.required]),
    endTime: new FormControl("", [Validators.required]),
    totalPeople: new FormControl("", [Validators.required]),
    services: new FormArray([])
  })

  get services() {
    return this.reactiveForm.controls["services"] as FormArray;
  }
  chargeFormArrays(){
    const formArray = this.reactiveForm.controls["services"] as FormArray;
    const eventForm = new FormGroup({
      serviceId: new FormControl(""), //Select API
      quantity: new FormControl(""),
      pricePerPerson: new FormControl(""), 
      startTime: new FormControl(""),
      endTime: new FormControl(""),
    }
  );
  }

  chargeBooking(){
    const getAllSubscription = this.bookingService.getBookingById(this.indexToUpdate).subscribe({
      next: (response) => {
        this.bookingToUpdate = response;
        console.log(this.bookingToUpdate)
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
    this.subscriptions.add(getAllSubscription);
  }
  subscriptions = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  confirmUpdate() {
    this.updateConfirmed.emit(this.indexToUpdate);
  }

  cancel() {
    this.updateConfirmed.emit(this.indexToUpdate);
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

  update(){
    const booking: Booking = this.reactiveForm.value;
    booking.id = this.indexToUpdate
    booking.status = 'confirmed';
    booking.createdAt = this.bookingToUpdate?.createdAt;
    booking.totalAmount = this.bookingToUpdate?.totalAmount;
    booking.bookingCode = this.bookingToUpdate?.bookingCode;

    console.log(booking)
    console.log(this.indexToUpdate)

      this.bookingService.putBooking(booking).subscribe({
        next: (response) => {
          console.log('Orden enviada correctamente', response);
          this.confirmUpdate();
        },
        error: (error) => {
          console.error('Error al enviar la orden', error);
        }
      });
    
    
  }

  
}
