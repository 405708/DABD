import { inject, Injectable } from '@angular/core';
import { environment} from './environment';
import { HttpClient } from '@angular/common/http';
import { Department, Employee, EmployeeSubmit } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor() { }

  enviroment = environment;
  private readonly http: HttpClient = inject(HttpClient);

  getDepartaments() {
    return this.http.get<Department[]>(`${this.enviroment.apiDepartments}`);
  }

  postEmployee(employee: EmployeeSubmit) {
    return this.http.post<EmployeeSubmit>(`${this.enviroment.apiEmployees}`, employee);
  }

  getEmployees() {
    return this.http.get<any[]>(`${this.enviroment.apiEmployees}`);
  }

  getEmployeesByDni(dni: string) {
    return this.http.get<Employee[]>(`${this.enviroment.apiEmployees}?dni=${dni}`);
  }

}
