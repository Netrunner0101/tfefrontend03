import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./Service/auth.service";

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = sessionStorage.getItem('token');

    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization',`Bearer ${token}`),
    });
    console.log('Interceptor : '+ token);
    return next.handle(request);
  }
}
