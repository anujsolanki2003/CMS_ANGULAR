import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        this.snackbarService.openSnackBar('Login successful!', 'Close');
        const userRole = response.user.role.toLowerCase();
        if (userRole === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (userRole === 'user') {
          this.router.navigate(['/user-products']);
        } else {
          this.errorMessage = 'User role is not recognized.';
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
