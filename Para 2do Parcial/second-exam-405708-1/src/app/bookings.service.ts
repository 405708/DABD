import { inject, Injectable } from '@angular/core';
import { environment, environmentJson } from './environment';
import { HttpClient } from '@angular/common/http';
import { Booking, Service, Venue } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor() { }

  //enviroment = environment;
  enviroment = environmentJson;
  private readonly http: HttpClient = inject(HttpClient);

  getServices() {
    return this.http.get<any[]>(`${this.enviroment.apiServices}`);
  }

  postBooking(booking: Booking) {
    return this.http.post<Booking>(`${this.enviroment.apiBookings}`, booking);
  }

  //PARA UN UPDATE
  putBooking(booking: Booking) {
    return this.http.put<Booking>(`${this.enviroment.apiBookings}/${booking.id}`, booking);
  }

  getBookingById(id: string) {
    return this.http.get<Booking>(`${this.enviroment.apiBookings}?id=${id}`);
  }
  //PARA UN UPDATE

  getBookingByCompanyEmail(companyEmail: string) {
    return this.http.get<Booking[]>(`${this.enviroment.apiBookings}?companyEmail=${companyEmail}`);
  }

  getVenues() {
    return this.http.get<Venue[]>(`${this.enviroment.apiVenues}`);
  }

  getBookings(){
    return this.http.get<Booking[]>(`${this.enviroment.apiBookings}`);
  }

  getAvabilityByDate(date: Date){
    return this.http.get<any[]>(`${this.enviroment.apiAvailability}?date=${date}`);
  }

  getVenuesById(id:string) {
    return this.http.get<Venue>(`${this.enviroment.apiVenues}?id=${id}`);
  }



}
