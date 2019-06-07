import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import sampleSearchData from '../assets/sample-data/search-result.sample.json';
import sampleDetailData from '../assets/sample-data/reports-result.sample.json';
import { UsdaService } from './usda.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineInterceptor implements HttpInterceptor {
  constructor() {
    if (environment.offline) {
      console.dir('Offline interceptor enabled. Will substitute some API calls with on-disk sample data.');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!environment.offline) {
      return next.handle(req);
    }
    if (req.url === UsdaService.USDA_SEARCH_URL) {
      console.log('Returning sample search data.');
      return of(new HttpResponse({body: sampleSearchData}));
    }
    if (req.url === UsdaService.USDA_DETAIL_URL) {
      console.log('Returning sample detail data');
      return of(new HttpResponse({body: sampleDetailData}));
    }
    return next.handle(req);
  }
}