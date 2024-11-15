import { Routes } from "@angular/router";
import { BookingsListComponent } from "./app/bookings-list/bookings-list.component";
import { CreateBookingComponent } from "./app/create-booking/create-booking.component";
import { BookingUpdateComponent } from "./app/booking-update/booking-update.component";
import { roleGuard } from "./app/guard";
import { LoginComponent } from "./app/login/login.component";
import { AccessDeniedComponent } from "./app/access-denied/access-denied.component";

export const BOOKING_ROUTES: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'list', component: BookingsListComponent
    },
    {
        //GUARDS
        path: 'form', component: CreateBookingComponent,
        canActivate: [roleGuard],
        data: { role: 'EDITOR' }
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'access-denied', component: AccessDeniedComponent
    }
]