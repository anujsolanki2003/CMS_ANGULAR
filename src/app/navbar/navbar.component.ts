import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: any = null;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.loadUser();
  }

  loadUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.isAdmin = this.user.role.toLowerCase() === 'admin';
    }
  }

  // Logout Function
  logout() {
    this.authService.logout();
    this.user = null;
    this.isAdmin = false;
  }

  toggleTheme() {
    const currentTheme = document.body.classList.toggle('dark-theme');
    if (currentTheme) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}
