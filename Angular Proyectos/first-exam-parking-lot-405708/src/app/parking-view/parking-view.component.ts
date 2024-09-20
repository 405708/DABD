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
  parkingSlot : any[] = PARKING_LOT_COPY

  private parkingService  = inject(ParkingService)



  ngOnInit(): void {
    this.subscribeParkings()
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
  

}
