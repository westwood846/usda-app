import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReferenceService {

  constructor(public http: HttpClient) {
  }

  static getReference() {
    return {
      "Water":                              { target: 3000, lower: 3000, upper: Infinity },
      "Energy":                             { target: 2500 },
      "Protein":                            { target: 50, lower: 50, upper: 500 },
      "Total lipid (fat)":                  { target: 50, lower: 20, upper: 50 },
      "Carbohydrate, by difference":        { target: 250, lower: 200, upper: 500 },
      "Fiber, total dietary":               { target: 30, lower: 30, upper: 70 },
      "Sugars, total":                      { target: 35 },

      "Calcium, Ca":                        { target: 1000 },
      "Iron, Fe":                           { target: 18 },
      "Magnesium, Mg":                      { target: 350 },
      "Phosphorus, P":                      { target: 700 },
      "Potassium, K":                       { target: 4000 },
      "Sodium, Na":                         { target: 1500 },
      "Zinc, Zn":                           { target: 11 },

      "Vitamin C, total ascorbic acid":     { target: 90 },
      "Thiamin":                            { target: 1.95 },
      "Riboflavin":                         { target: 1.3 },
      "Niacin":                             { target: 16 },
      "Vitamin B-6":                        { target: 1.7 },
      "Folate, DFE":                        { target: 400 },
      "Vitamin B-12":                       { target: 2.4 },
      "Vitamin A, RAE":                     { target: 900 },
      "Vitamin A, IU":                      { target: 18000 },
      "Vitamin E (alpha-tocopherol)":       { target: 15 },
      "Vitamin D (D2 + D3)":                { target: 20 },
      "Vitamin D":                          { target: 800 },
      "Vitamin K (phylloquinone)":          { target: 120 },

      "Fatty acids, total saturated":       { target: 15 },
      "Fatty acids, total monounsaturated": { target: 20 },
      "Fatty acids, total polyunsaturated": { target: NaN },
      "Fatty acids, total trans":           { target: 2 },
      "Cholesterol":                        { target: 300 },

      "Caffeine":                           { target: 400 },
    }
  }

}
