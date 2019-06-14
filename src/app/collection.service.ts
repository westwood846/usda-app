import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { isUndefined, cloneDeep, set } from 'lodash';
import { size, keys } from 'lodash/fp';
import { BehaviorSubject, of, Observable, combineLatest } from 'rxjs';
import { UsdaService } from './usda.service';
import { map, distinctUntilChanged, flatMap, tap } from 'rxjs/operators';

/*
 * Provides access to and manipulation of the collection state.
 * Provides transformations and statistics for the collection.
 */
@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private state: Record<string, number> = {};
  public collection = new BehaviorSubject<Record<string, number>>({});

  constructor(private storage: Storage, private usda: UsdaService) {
    let getPromise = this.storage.get('collection') ;
    getPromise.then(collection => {
      this.state = collection || {};
      this.emitState();
    });
    getPromise.catch(console.error);
  }

  addToCollection(id: string, amount: number) {
    let existingAmount = this.state[id];
    if (isUndefined(existingAmount) || existingAmount !== amount) {
      this.state[id] = amount;
      this.syncWithStorage();
      this.emitState();
    }
  }

  deleteFromCollection(id: string) {
    delete this.state[id];
    this.syncWithStorage();
    this.emitState();
  }

  logCollection() {
    console.log(this.state)
  }

  clearCollection() {
    this.state = {};
    this.syncWithStorage();
    this.emitState();
  }

  private syncWithStorage() {
    let setPromise = this.storage.set('collection', this.state);
    setPromise.catch(console.error);
  }

  private emitState() {
    this.collection.next(this.state);
  }


  public totalSize(): Observable<number> {
    return this.collection.pipe(map(size));
  }

  public totalMass(): Observable<number> {
    return of(Infinity);
  }

  public totalEnergy(): Observable<number> {
    return of(Infinity);
  }

  private setAmountsOnFoods = (foods: ReportsResultModel.Food[]) => foods.map(food => set(food, 'amount', this.state[food.desc.ndbno]))
  private resolveIdsToFoods = (ids: string[]) => (ids.length === 0) ? of([]) : combineLatest(ids.map(this.usda.getFood, this.usda));
  private scaleNutrientsInFoods = (foods: ReportsResultModel.Food[]) => cloneDeep(foods).map(food => set(food, 'nutrients', food.nutrients.map(nutrient => set(nutrient, 'value', parseFloat(nutrient.value) / 100 * food.amount))));

  public getFoods(): Observable<ReportsResultModel.Food[]> {
    return this.collection.pipe(map(keys), distinctUntilChanged(), flatMap(this.resolveIdsToFoods), map(this.setAmountsOnFoods), tap(console.log));
  }

  public getFoodsWithScaledNutrients(): Observable<ReportsResultModel.Food[]> {
    return this.getFoods().pipe(map(this.scaleNutrientsInFoods));
  }

}
