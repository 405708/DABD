export interface User {
    email: string;
    password: string;
    id: string;
  }
  
  export interface AlarmMode {
    name: string;
    userId: string;
    creationDate: Date;
    zones: string[];
  }
  
  export interface AlarmStatus {
    id: number;
    isActive: boolean;
    userId: string;
  }
  
  export interface AlarmZone {
    id: number;
    name: string;
  }
  