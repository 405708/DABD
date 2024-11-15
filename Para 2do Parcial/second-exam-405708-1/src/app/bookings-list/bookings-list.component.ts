import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking, BookingService, Venue } from '../interfaces';
import { BookingsService } from '../bookings.service';
import { Subscription } from 'rxjs';
import { BookingUpdateComponent } from '../booking-update/booking-update.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styles: [`
    .badge { text-transform: capitalize; }
  `],
  imports: [CurrencyPipe, ReactiveFormsModule, DatePipe, BookingUpdateComponent, CommonModule],
  standalone: true
})
export class BookingsListComponent implements OnInit, OnDestroy {

  private bookingService: BookingsService = inject(BookingsService);
  private readonly router: Router = inject(Router);
  searchTerm = new FormControl('');
  bookings: Booking[] = [];
  allBookings: Booking[] = [];
  venues: Venue[] = [];
  roleToView: string = 'ADMIN'; // Con Permisos
  roleAuxiliar = 'DEVELOPER' //Sin permisos
  


  constructor() {}

  private authService: AuthService = inject(AuthService);
  ngOnInit(): void {
    //FORMA SIN LOGIN(No haria falta el login.component)
    //this.authService.setRoleDefault(this.roleToView) //INICIAR CON ROL

    this.getVenues();
    this.getBookings();
    this.filterOrders();
  }

  //BOTONES DE CAMBIO DE ROL
  changeRoles(string: string){
    this.authService.setRoleDefault(string)
  }

  subscriptions = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getBookings() {
    const getAllSubscription = this.bookingService.getBookings().subscribe({
      next: (response) => {
        this.allBookings = response;
        this.bookings = [...this.allBookings];
        this.getVenueNames(this.bookings); // Llama a getVenueNames aquí
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
    this.subscriptions.add(getAllSubscription);
  }


  filterOrders() {
    this.searchTerm.valueChanges.subscribe(searchTerm => {
      if (searchTerm === null || searchTerm.trim() === '') {
        this.bookings = [...this.allBookings];
      } else {
        const lowerCaseTerm = searchTerm.toLowerCase();
        this.bookings = this.allBookings.filter(booking => 
          booking.companyName.toLowerCase().includes(lowerCaseTerm) ||
          booking.bookingCode?.toLowerCase().includes(lowerCaseTerm)
        );
      }
    });
  }

  getVenues() {
    const getAllSubscription = this.bookingService.getVenues().subscribe({
        next: (response) => {
          this.venues = response
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
      this.subscriptions.add(getAllSubscription)
  }

  getVenueNames(bookings: Booking[]) {
    bookings.forEach(booking => {
      const venue = this.venues.find(ve => ve.id === booking.venueId);
      if (venue) {
        booking.venueName = venue.name; // Agrega el nombre del venue al objeto booking
      }
    });
  }
  

 
  getStatusBadgeClass(status?: string): string {
    switch (status) {
      case 'confirmed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }


  //SI PIDE OUTPUT E INPUT
  @Output() indexToUpdate = new EventEmitter<string>();
  selectedId: string = '';
  showList: boolean = true;
  toEdit(index: string | undefined){
    if (index) {
      this.selectedId = index;
      this.showList = false; // Oculta la lista
      console.log(index)
    }
  }
  handleUpdate(id: string) {
    console.log('Actualización confirmada para el ID:', id);
    // Aquí podrías navegar a otra ruta o realizar alguna acción
    this.getBookings()
    this.showList = true;
  }
}
