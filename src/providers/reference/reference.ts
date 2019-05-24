import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReferenceProvider {

  constructor(public http: HttpClient) {
  }

}
