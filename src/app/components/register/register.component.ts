import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  user: User = {};
  errorMessage: string = '';

  registerUser() {
    this.authService.register(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
        this.errorMessage = '';
      },
      error: (data) => {
        if (data.error) {
          this.errorMessage = data.error.message;
        }
      },
    });
  }
}
