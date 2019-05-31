import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private state = {};
  public collection = new BehaviorSubject<{}>({});

  constructor(private storage: Storage) {
    let getPromise = this.storage.get('collection') ;
    getPromise.then(collection => {
      this.state = collection || {};
      this.emitState();
    });
    getPromise.catch(console.error);
  }

  addToCollection(id: string, amount: number) {
    let existingAmount = this.state[id];
    if (isUndefined(existingAmount) || existingAmount.amount !== amount) {
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

}
