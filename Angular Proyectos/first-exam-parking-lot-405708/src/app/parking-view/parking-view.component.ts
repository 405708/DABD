import { Component, inject, Input, OnInit } from '@angular/core';
import { ParkingService } from '../parking.service';
import { CommonModule } from '@angular/common';
import { PARKING_LOT_COPY, Vehicule, VehiculeType } from '../services/data/mock-parking.data';

@Component({
  selector: 'app-parking-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parking-view.component.html',
  styleUrl: './parking-view.component.css'
})
export class ParkingViewComponent implements OnInit{
  parkingSlot : any[] = []

  private parkingService  = inject(ParkingService)



  ngOnInit(): void {
    this.subscribeParkings();
    this.organizeParking();
  }

  subscribeParkings(){
    this.parkingSlot = this.parkingService.getParkingSlots()
    console.log(this.parkingSlot)
   //this.parkingService.getParkingSlots().subscribe(parking => this.parkingSlot = parking)
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  @Input() vehiculeToAdd: Vehicule[] = []


  //Vista parking
  organizeParking() {
    const slotsPerRow = 6;
    this.parkingSlot = [];
    for (let i = 0; i < PARKING_LOT_COPY.length; i += slotsPerRow) {
      this.parkingSlot.push(PARKING_LOT_COPY.slice(i, i + slotsPerRow));
    }
  }

  getSlotClass(slot: any) {
    return slot.availablePlaces === 0 ? 'border-danger' : 'border-success';
  }

  getVehicleClass(vehicle: VehiculeType) {
    return 'vehicle';
  }

  getVehicleIcon(vehicle: VehiculeType) {
    switch (vehicle) {
      case VehiculeType.CAR:
        return 'bi bi-car-front-fill';
      case VehiculeType.MOTORCYCLE:
        return 'bi bi-bicycle';
      case VehiculeType.TRUCK:
        return 'bi bi-truck';
      default:
        return '';
    }
  }

  getVehicleTypeLabel(vehicle: VehiculeType) {
    switch (vehicle) {
      case VehiculeType.CAR:
        return 'Auto';
      case VehiculeType.MOTORCYCLE:
        return 'Moto';
      case VehiculeType.TRUCK:
        return 'Camión';
      default:
        return '';
    }
  }

  createArray(number: number): number[] {
    return new Array(number);
  }


  

}
