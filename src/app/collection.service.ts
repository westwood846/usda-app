import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { isUndefined } from 'lodash';
import { size } from 'lodash/fp';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { UsdaService } from './usda.service';
import { map } from 'rxjs/operators';

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

}
