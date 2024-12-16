import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'employees', pathMatch: 'full'},
  {
    path: 'employees', 
    loadChildren: () => import('./employees.routes').then(r=> r.EMPLOYEES_ROUTES)
  }
];

