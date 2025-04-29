import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('accessToken')) {
      const accessToKen = sessionStorage.getItem('accessToken');
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${accessToKen}`
      );
      const authRequest = req.clone({ headers: headers });
      return next.handle(authRequest);
    }
    return next.handle(req);
  }
}
