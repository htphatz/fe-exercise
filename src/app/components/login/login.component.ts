import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  isActive: boolean = true;
  hasError: boolean = false;

  login(): void {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.authService.storeToken(
            data.result.accessToken,
            data.result.refreshToken
          );
          this.authService.canAuthenticate();
          this.errorMessage = '';
          const jwtHelper = new JwtHelperService();
          console.log(
            'decodedToken: ',
            jwtHelper.decodeToken(data.result.accessToken)
          );
          console.log(
            'isExpired: ',
            jwtHelper.isTokenExpired(data.result.accessToken)
          );
        }
      },
      error: (data) => {
        console.log(data);
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
