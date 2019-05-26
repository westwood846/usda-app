import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsdaService {

  private static USDA_API_KEY = 'FYTSTF75mesLeO85VFSKvqgWEzdL0hQAYCZUtjJk';

  constructor(public http: HttpClient) {
  }

  query(query: string) {
    return this.http.get(`https://api.nal.usda.gov/ndb/search`, { params: {api_key: UsdaService.USDA_API_KEY, q: query, ds: "Standard Reference"} });
  }

  get(id: string) {
    return this.http.get(`https://api.nal.usda.gov/ndb/V2/reports`, { params: {api_key: UsdaService.USDA_API_KEY, ndbno: id} });
  }

}
