import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking, BookingService, Venue } from '../interfaces';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styles: [`
    .badge { text-transform: capitalize; }
  `],
  imports: [CurrencyPipe, ReactiveFormsModule, DatePipe],
  standalone: true
})
export class BookingsListComponent  {

  private bookingService: BookingsService = inject(BookingsService);
  private readonly router: Router = inject(Router);
  searchTerm = new FormControl('');
  bookings: Booking[] = [];
  allBookings: Booking[] = [];
  venues: Venue[] = [];


  constructor() {}

  ngOnInit(): void {
    this.getVenues();
    this.getOrders();
    this.filterOrders();
  }

  getOrders() {
    this.bookingService.getBookings().subscribe({
      next: (response) => {
        this.allBookings = response;
        this.bookings = [...this.allBookings];
        this.getVenueNames(this.bookings); // Llama a getVenueNames aquí
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
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
      this.bookingService.getVenues().subscribe({
        next: (response) => {
          this.venues = response
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
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
}