import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { UsdaService } from '../usda.service';
import { map, tap, flatMap, reduce, mergeMap, distinctUntilChanged } from 'rxjs/operators';

import { set, groupBy, concat, chain, sum, flatten, keys, cloneDeep, values, merge } from 'lodash';
import { mergeWith } from 'lodash/fp';
import { strict } from 'assert';
import { getComponentViewByIndex } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  public collection: BehaviorSubject<Record<string, number>>;
  public foods;
  public nutrients;
  public amounts: Record<string, number>;
  public foodsWithAmounts$: Observable<ReportsResultModel.Food[]>;
  public nutrients$: Observable<ReportsResultModel.Nutrient[]>;
  public nutrientsByGroup$: Observable<Record<string, ReportsResultModel.Nutrient[]>>;


  private setAmountsOnFoods = (foods: ReportsResultModel.Food[], collection: Record<string, number>) => foods.map(food => set(food, 'amount', collection[food.desc.ndbno]))
  private toFoodsObservable = (ids: string[]) => (ids.length === 0) ? of([]) : combineLatest(ids.map(this.usda.getFood, this.usda))
  private toScaledNutrients = (foods: ReportsResultModel.Food[]) => cloneDeep(foods).map(food => set(food, 'nutrients', food.nutrients.map(nutrient => set(nutrient, 'value', parseFloat(nutrient.value) / 100 * food.amount))))
  private toNutrientArrays = (foods: ReportsResultModel.Food[]) => foods.map(food => food.nutrients);
  private groupByNutrientName = (nutrientArrays: ReportsResultModel.Nutrient[][]) => chain(nutrientArrays).flatten().groupBy('name').value();
  private mergeNutrientGroups = (nutrientGroups: Record<string, ReportsResultModel.Nutrient[]>) => values(nutrientGroups).map(group => group.reduce((acc, nutrient) => set(acc, 'value', acc.value + nutrient.value), group[0]));

  constructor(private collectionService: CollectionService, private usda: UsdaService) {
    let collection$ = this.collectionService.collection;
    let ids$ = collection$.pipe(map(keys), distinctUntilChanged());
    let foods$ = ids$.pipe(flatMap(this.toFoodsObservable));
    this.foodsWithAmounts$ = combineLatest(foods$, collection$, this.setAmountsOnFoods);
    this.nutrients$ = this.foodsWithAmounts$.pipe(
      map(this.toScaledNutrients),
      map(this.toNutrientArrays),
      map(this.groupByNutrientName),
      map(this.mergeNutrientGroups)
    );
    this.nutrientsByGroup$ = this.nutrients$.pipe(map(nutrients => groupBy(nutrients, 'group')));
  }

  ngOnInit() {
  }

  logCollection() {
    this.collectionService.logCollection();
  }

  clearCollection() {
    this.collectionService.clearCollection();
  }

  updateCollection(id: string, amount: number) {
    this.collectionService.addToCollection(id, amount);
  }

  deleteFood(id: string) {
    this.collectionService.deleteFromCollection(id);
  }

  changeAmount(id, newAmount) {
    if (isNaN(newAmount)) return
    this.updateCollection(id, newAmount);
  }

}
