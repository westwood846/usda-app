import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  public collection = new BehaviorSubject<{}>({});

  constructor(private storage: Storage) {
    this.storage.get('collection').then(collection => {
      this.collection.next(collection);
    });
  }

  addToCollection(id: string, amount: number) {
    return this.storage.get('collection').then(collection => {
      let existingAmount = collection[id];
      if (isUndefined(existingAmount) || existingAmount.amount !== amount) {
        collection[id] = amount;
        this.storage.set('collection', collection);
        this.collection.next(collection);
      }
    });
  }

  deleteFromCollection(id: string) {
    return this.storage.get('collection').then(collection => {
      delete collection[id];
      this.storage.set('collection', collection);
      this.collection.next(collection);
    });
  }

  logCollection() {
    this.storage.get('collection').then(console.dir);
  }

  clearCollection() {
    this.storage.set('collection', {});
    this.collection.next({});
  }

}
