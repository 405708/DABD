import { Routes } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { EmployeesComponent } from "./employees/employees.component";

export const EMPLOYEES_ROUTES: Routes = [
  {
      path: '', component: EmployeesComponent
  },
  {
      path: 'create', component: CreateEmployeeComponent
  }
]