import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/apiResponse.model';

const baseUrl: string = `http://localhost:8081/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<APIResponse<any>> {
    const getByIdUrl: string = `${baseUrl}/${id}`;
    return this.httpClient.get<APIResponse<any>>(getByIdUrl);
  }

  getAllUsers(): Observable<APIResponse<any>> {
    return this.httpClient.get<APIResponse<any>>(baseUrl);
  }

  searchUsers(
    pageNumber: number = 1,
    pageSize: number = 5,
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string
  ): Observable<APIResponse<any>> {
    const searchUsers: string = `${baseUrl}/search`;

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (username) {
      params = params.set('username', username);
    }
    if (firstName) {
      params = params.set('firstName', firstName);
    }
    if (lastName) {
      params = params.set('lastName', lastName);
    }
    if (email) {
      params = params.set('email', email);
    }
    return this.httpClient.get<APIResponse<any>>(searchUsers, { params });
  }

  deleteById(id: string): void {
    const deleteById: string = `${baseUrl}/${id}`;
    this.httpClient.delete(deleteById);
  }
}
