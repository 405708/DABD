import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Vehicule } from '../services/data/mock-parking.data';
import { CommonModule } from '@angular/common';
import { MiscellaneousService } from '../services/data/miscellaneous.service';

@Component({
  selector: 'app-parking-slot-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [MiscellaneousService],
  templateUrl: './parking-slot-form.component.html',
  styleUrl: './parking-slot-form.component.css',
})
export class ParkingSlotRequestComponent implements OnInit{

  private miscellaneousService = inject(MiscellaneousService)

  constructor() { }


  @Output() backToView = new EventEmitter<void>;

  volverAView(){
    this.backToView.emit();
  }

  brands : any[] = []
  ngOnInit(): void {
    this.useBrnads()
    console.log(this.brands)
  }

useBrnads(){
  this.brands = this.miscellaneousService.getBrands()
}

 vehiculeToAdd: Vehicule = {
  brand: '',
  model: '',
  domain: '',
  newDomain: false,
  type: 1,
  horaIngreso: new Date()
}

@Output() newVehicule = new EventEmitter<Vehicule>();

save(form:NgForm){
  if(form.invalid){
    return;
  }
  this.newVehicule.emit(form.value)
  console.log(form.value)
  form.resetForm()
}

}

