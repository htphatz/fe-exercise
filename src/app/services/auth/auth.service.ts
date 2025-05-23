import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { APIResponse } from 'src/app/models/apiResponse.model';
import { LoginResponse } from 'src/app/models/loginResponse.model';
import { User } from 'src/app/models/user.model';

const baseUrl: string = `http://localhost:8080/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
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
    console.log(user);

    const loginUrl = `${baseUrl}/login`;
    const body = {
      username: user.username,
      password: user.password,
    };
    return this.httpClient.post<APIResponse<LoginResponse>>(loginUrl, body);
    // .pipe(
    //   catchError((error) => {
    //     console.error('Login error:', error);
    //     return throwError(() => new Error('Login failed. Please try again.'));
    //   })
    // );
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

  storeToken(accessToken: string, refreshToken: string) {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  }

  removeAccessToken() {
    sessionStorage.removeItem('accessToken');
  }

  removeRefreshToken() {
    sessionStorage.removeItem('refreshToken');
  }

  logout() {
    const accessToken = this.getAccessToken();
    const logoutUrl: string = `${baseUrl}/logout`;
    const body = { accessToken };
    this.httpClient.post(logoutUrl, { body });
    this.removeAccessToken();
    this.removeRefreshToken();
    this.router.navigate(['/login']);
  }
}
