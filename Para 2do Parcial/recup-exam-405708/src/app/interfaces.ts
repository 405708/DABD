export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  departmentId: string;
  baseSalary: number;
  relatives: Relative[];
}

export interface EmployeeSubmit {
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  departmentId: string;
  baseSalary: number;
  relatives: Relative[];
}

export interface Relative {
  firstName: string;
  relationship: 'Hijo/a' | 'Cónyuge' | 'Padre/Madre';
  dni: string;
  birthDate: string;
}

export interface Department {
  id: string;
  name: string;
}

export enum RELATIVESExists{
  Hijo = 'Hijo/a',
  Conyuge = 'Cónyuge',
  Padre = 'Padre/Madre'
}