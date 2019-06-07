import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, iif } from 'rxjs';
import { map } from 'rxjs/operators';
import { get } from 'lodash/fp';


@Injectable({
  providedIn: 'root'
})
export class UsdaService {

  private static USDA_API_KEY = 'FYTSTF75mesLeO85VFSKvqgWEzdL0hQAYCZUtjJk';
  public static USDA_SEARCH_URL = 'https://api.nal.usda.gov/ndb/search'
  public static USDA_DETAIL_URL = 'https://api.nal.usda.gov/ndb/V2/reports'

  constructor(public http: HttpClient) {
  }

  search(query: string): Observable<SearchResultModel.SearchResult> {
    return this.http.get<SearchResultModel.SearchResult>(UsdaService.USDA_SEARCH_URL, { params: {api_key: UsdaService.USDA_API_KEY, q: query, ds: "Standard Reference"} });
  }

  getReports(id: string): Observable<ReportsResultModel.ReportsResult> {
    return this.http.get<ReportsResultModel.ReportsResult>(UsdaService.USDA_DETAIL_URL, { params: {api_key: UsdaService.USDA_API_KEY, ndbno: id} });
  }

  getFood(id:string): Observable<ReportsResultModel.Food> {
    return this.getReports(id).pipe(map(get('foods[0].food')));
  }

}
