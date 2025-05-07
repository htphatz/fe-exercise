import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  loginForm!: FormGroup;

  errorMessage: string = '';

  isActive: boolean = true;
  hasError: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login(): void {
    const formData = this.loginForm.value;
    const body: any = {
      username: formData.username,
      password: formData.password,
    };
    this.authService.login(body).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.authService.storeToken(
            data.result.accessToken,
            data.result.refreshToken
          );
          this.authService.canAuthenticate();
          this.errorMessage = '';
          this.router.navigate(['/']);
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
