import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { UsdaService } from '../usda.service';
import { map, tap, flatMap, reduce, mergeMap, distinctUntilChanged } from 'rxjs/operators';

import { set, groupBy, concat, chain, sum, flatten, keys, cloneDeep, values, merge } from 'lodash';
import { mergeWith } from 'lodash/fp';
import { strict } from 'assert';
import { getComponentViewByIndex } from '@angular/core/src/render3/util';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  public foodsWithAmounts$: Observable<ReportsResultModel.Food[]>;
  public nutrients$: Observable<ReportsResultModel.Nutrient[]>;
  public nutrientsByGroup$: Observable<Record<string, ReportsResultModel.Nutrient[]>>;


  private toNutrientArrays = (foods: ReportsResultModel.Food[]) => foods.map(food => food.nutrients);
  private groupByNutrientName = (nutrientArrays: ReportsResultModel.Nutrient[][]) => chain(nutrientArrays).flatten().groupBy('name').value();
  private mergeNutrientGroups = (nutrientGroups: Record<string, ReportsResultModel.Nutrient[]>) => values(nutrientGroups).map(group => group.reduce((acc, nutrient) => set(acc, 'value', acc.value + nutrient.value), group[0]));

  public sortGroupsByCustomOrder = UsdaService.sortGroupsByCustomOrder;

  constructor(private collectionService: CollectionService, private usda: UsdaService) {
    this.foodsWithAmounts$ = this.collectionService.getFoods();
    this.nutrients$ = this.collectionService.getFoodsWithScaledNutrients().pipe(
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
