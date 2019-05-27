import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UsdaService } from '../usda.service';
import { map, tap, flatMap, reduce, mergeMap } from 'rxjs/operators';

import { set, groupBy, concat, chain, sum, flatten } from 'lodash';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  public collection: BehaviorSubject<any>;
  public foods;
  public nutrients;
  public amounts;

  constructor(private collectionService: CollectionService, private usda: UsdaService) {
    this.collection = collectionService.collection;
    this.collection.subscribe(collection => this.amounts = collection);
    this.collection.pipe(
      map(collection => Object.keys(collection)),
      flatMap(ids => combineLatest(ids.map(id => this.usda.get(id)))),
      map(foodResults => foodResults.map(foodResult => foodResult['foods'][0].food)),
      map(foods => foods.reduce((acc, food) => set(acc, food['desc'].ndbno, food), {}))
    ).subscribe(foods => {
      Object.keys(this.amounts).forEach(id => foods[id].amount = this.amounts[id]);
      let nutrientsOfFoods = Object.values(foods).reduce((acc, food) => set(acc, food['desc'].ndbno, food['nutrients'].map(nutrient => set(nutrient, 'value', nutrient.value * food['amount'] / 100))), {});
      this.nutrients = chain(Object.values(nutrientsOfFoods))
        .flatten()
        .groupBy('nutrient_id')
        .map(nutrientGroup => nutrientGroup.reduce((acc, nutrient) => set(acc, 'value', acc.value + nutrient.value), nutrientGroup[0]))
        .each(nutrient => delete nutrient.measures)
        .value();
      // Object.values(this.nutrients).reduce((acc, nutrientsOfFood) => set(acc, nutrients), {});
      console.dir(this.nutrients)
      Object.values(foods).forEach(food => food['nutrients'] = groupBy(food['nutrients'], 'group'));
      this.foods = foods;
    });
  }

  ngOnInit() {
  }

  logCollection() {
    this.collectionService.logCollection();
  }

  clearCollection() {
    this.collectionService.clearCollection();
  }

}
