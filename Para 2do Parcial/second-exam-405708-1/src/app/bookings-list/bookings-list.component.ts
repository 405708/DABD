import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking, BookingService, Venue } from '../interfaces';
import { BookingsService } from '../bookings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styles: [`
    .badge { text-transform: capitalize; }
  `],
  imports: [CurrencyPipe, ReactiveFormsModule, DatePipe],
  standalone: true
})
export class BookingsListComponent implements OnInit, OnDestroy {

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

  subscriptions = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getOrders() {
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
}
