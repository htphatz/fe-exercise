import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  registerForm!: FormGroup;

  user: User = { id: '', username: '', email: '', firstName: '', lastName: '' };
  errorMessage: string = '';

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      passwordGroup: this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword: ['', [Validators.required]],
        },
        {
          validators: passwordMatchValidator,
        }
      ),
    });
  }

  registerUser() {
    this.authService.register(this.user).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.router.navigate(['/login']);
          this.errorMessage = '';
        }
      },
      error: (data) => {
        if (data.error) {
          this.errorMessage = data.error.message;
        }
      },
    });
  }
}
