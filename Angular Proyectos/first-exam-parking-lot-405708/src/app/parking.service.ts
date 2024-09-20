import { Injectable } from '@angular/core';
import { PARKING_LOT_COPY } from './services/data/mock-parking.data';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor() { }

  parkings : any[] = PARKING_LOT_COPY

  getParkingSlots(){
    return this.parkings
  }
}
