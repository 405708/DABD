import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ArmedDisarmedComponent } from './armed-disarmed/armed-disarmed.component';
import { AlarmFormComponent } from './alarm-form/alarm-form.component';
import { validatorLoginGuard } from './guards/validator-login.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [validatorLoginGuard] , children:[
        { path: '', redirectTo: 'panel', pathMatch: 'full' },
        { path: 'panel', component: ArmedDisarmedComponent },
        { path: 'crear', component: AlarmFormComponent }
    ] ,},
];
