import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfflineInterceptor implements HttpInterceptor {
  constructor() {
    console.dir(environment);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req);
  }
}