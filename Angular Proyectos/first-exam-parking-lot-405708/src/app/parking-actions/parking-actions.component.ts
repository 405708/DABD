import { Component } from '@angular/core';
import { ParkingSlotRequestComponent } from '../parking-slot-form.component/parking-slot-form.component';
import { ParkingViewComponent } from '../parking-view/parking-view.component';
import { CommonModule } from '@angular/common';
import { Vehicule } from '../services/data/mock-parking.data';

@Component({
  selector: 'app-parking-actions',
  standalone: true,
  imports: [ParkingSlotRequestComponent, ParkingViewComponent, CommonModule],
  templateUrl: './parking-actions.component.html',
  styleUrl: './parking-actions.component.css'
})
export class ParkingActionsComponent {

  parkingView : boolean = true;

  newParking(event : Event){
    this.parkingView = false
  }

  backView(){
    this.parkingView = true;
  }

  vehiculesToAdd: Vehicule[] = [];

  addVehicule(vehicule : Vehicule){
    this.vehiculesToAdd.push(vehicule)
  }

}
