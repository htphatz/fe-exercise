import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/apiResponse.model';
import { LoginResponse } from 'src/app/models/loginResponse.model';
import { User } from 'src/app/models/user.model';

const baseUrl: string = `http://localhost:8081/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('accessToKen') !== null) {
      return true;
    }
    return false;
  }

  canAuthenticate(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  canAccess(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  login(user: User): Observable<APIResponse<LoginResponse>> {
    const loginUrl: string = `${baseUrl}/login`;
    const body = {
      username: user.username,
      password: user.password,
    };
    return this.httpClient.post<APIResponse<LoginResponse>>(loginUrl, body);
  }

  register(user: User): Observable<APIResponse<User>> {
    const registerUrl: string = `${baseUrl}/register`;
    const body = {
      username: user.username,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return this.httpClient.post<APIResponse<User>>(registerUrl, body);
  }

  storeToken(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem('accessToKen', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  }
}
