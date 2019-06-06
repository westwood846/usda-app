import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';


@Injectable({
  providedIn: 'root'
})
export class FdaService {

  private API_KEY = 'FYTSTF75mesLeO85VFSKvqgWEzdL0hQAYCZUtjJk';
  private SEARCH_URL = 'https://api.nal.usda.gov/fdc/v1/search';
  private REPORT_URL = 'https://api.nal.usda.gov/fdc/v1';
  private headers: HttpHeaders;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json", 
      "Authorization": "Basic " + btoa(`${this.API_KEY}:`)
    });
    console.dir(this.headers);
  }

  query(generalSearchInput: string) {
    console.dir(this.headers)
    return this.http.post(this.SEARCH_URL, {generalSearchInput}, {headers: this.headers});
  }

  get(id: string) {
    return this.http.get(`${this.REPORT_URL}/${id}`, {headers: this.headers});
  }

}
