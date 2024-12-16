import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../interfaces';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CurrencyPipe],
})
export class EmployeesComponent implements OnInit, OnDestroy{
  constructor() { }

  private employeesService:EmployeesService = inject(EmployeesService)
  searchTerm = new FormControl('');
  employees: Employee[] = [];
  allEmployees: Employee[] = [];

  ngOnInit(): void {
    this.getEmployees();
    this.filterOrders();
  }

  subscriptions = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getEmployees() {
    const getAllSubscription = this.employeesService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response;
        this.allEmployees = this.employees
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
    this.subscriptions.add(getAllSubscription);
  }


  filterOrders() {
    this.searchTerm.valueChanges.subscribe(searchTerm => {
      if (searchTerm === null || searchTerm.trim() === '') {
        this.employees = [...this.allEmployees];
      } else {
        const lowerCaseTerm = searchTerm.toLowerCase();
        this.employees = this.allEmployees.filter(employee => 
          employee.firstName.toLowerCase().includes(lowerCaseTerm) ||
          employee.lastName?.toLowerCase().includes(lowerCaseTerm) || 
          (employee.firstName.toLowerCase() + ' ' + employee.lastName?.toLowerCase()).includes(lowerCaseTerm)
        );
      }
    });
  }

}

