import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { APIResponse } from 'src/app/models/apiResponse.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8081/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by id', () => {
    const fakeResponse: APIResponse<any> = {
      result: { username: 'admin', firstname: 'admin', lastname: 'admin' },
      code: 200,
    };
    const userId = '123';

    service.getById(userId).subscribe((response) => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(fakeResponse);
  });

  it('should get all users', () => {
    const fakeResponse: APIResponse<any> = {
      result: [
        { username: 'admin1', firstname: 'admin1', lastname: 'admin1' },
        { username: 'admin2', firstname: 'admin2', lastname: 'admin2' },
      ],
      code: 200,
    };

    service.getAllUsers().subscribe((response) => {
      expect(response).toEqual(fakeResponse);
      expect(response.result.length).toBe(2);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(fakeResponse);
  });
});
