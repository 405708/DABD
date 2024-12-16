import { Component, inject, OnInit } from '@angular/core';
import { HomesafeService } from '../services/homesafe.service';
import { LoginService } from '../services/login.service';
import { AlarmMode, AlarmStatus, User } from '../models/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-armed-disarmed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './armed-disarmed.component.html',
  styleUrl: './armed-disarmed.component.css'
})
export class ArmedDisarmedComponent implements OnInit{
  private alarmService: HomesafeService = inject(HomesafeService)
  private loginService: LoginService = inject(LoginService)
  private router: Router = inject(Router)

  userLogged: User = { email: '', password: '', id: '' };
  alarmModes: AlarmMode[] = [];
  alarmStatus: AlarmStatus = { id: 1, isActive: false, userId: '' };
  armed: boolean = false;

  ngOnInit(): void {
    this.userLogged = this.loginService.getUserLogin()

    this.alarmService.getAlarmModesByUserId(this.userLogged.id).subscribe({
      next: (response) =>{
        this.alarmModes = response
      },
      error: (error) => {
        console.error('Error al cargar alarmas', error);
      }
    })
  
    this.alarmService.getAlarmStatusByUserId(this.userLogged.id).subscribe({
      next: (response) =>{
        this.alarmStatus = response[response.length - 1];
        if(this.alarmStatus.isActive){
          this.armed = true;
        }
      },
      error: (error) => {
        console.error('Error al cargar alarmas', error);
      }
    })
  }

  desarmar(){
    const status: AlarmStatus = {
      id:100,
      isActive: false,
      userId: this.userLogged.id
    }
    this.alarmService.postStatusMode(status).subscribe({
      next: (response) =>{
        this.armed = false;
      },
      error: (error) => {
        console.error('Error al cargar alarmas', error);
      }
    })
  }

  armar(){
    this.router.navigate(['home/crear'])
  }

}
