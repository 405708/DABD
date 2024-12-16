import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private loginService: LoginService = inject(LoginService)
  private router: Router = inject(Router)

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }
}
