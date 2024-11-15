import { Routes } from '@angular/router';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'booking', pathMatch: 'full'
  },
  {
    path: 'booking', 
    loadChildren: () => import('../booking.routes').then(r=> r.BOOKING_ROUTES)
  }
  //Componente Update Booking
  //Cargar datos segun el id, llamando a la json-db
  //Validaciones Async nuevas
  //Validacion personalizada (No registrar misma empresa)
  //Validacion personalizada (No se puede repetir servicio)

];

