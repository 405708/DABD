import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParkingSlotRequestComponent } from "./parking-slot-form.component/parking-slot-form.component";
import { ParkingActionsComponent } from './parking-actions/parking-actions.component';
import { MiscellaneousService } from './services/data/miscellaneous.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParkingSlotRequestComponent, ParkingActionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parking-lot';
}
