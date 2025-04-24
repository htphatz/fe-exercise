import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  user: User = {};
  errorMessage: string = '';

  login(): void {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.authService.storeToken(
          data.result.accessToken,
          data.result.refreshToken
        );
        this.authService.canAuthenticate();
        this.errorMessage = '';
      },
      error: (data) => {
        if (data.error) {
          this.errorMessage = data.error.message;
        }
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
