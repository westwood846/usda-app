import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReferenceProvider {

  constructor(public http: HttpClient) {
  }

  static getReference() {
    return {
      "Water":                       { lower: 3000, upper: Infinity },
      "Energy":                      { target: 2500 },
      "Protein":                     { lower: 50, upper: 500 },
      "Total lipid (fat)":           { lower: 20, upper: 50 },
      "Carbohydrate, by difference": { lower: 200, upper: 500 },
      "Fiber, total dietary":        { lower: 20, upper: 70 },
      "Sugars, total":               { lower: 20, upper: 70 },
    }
  }

}
