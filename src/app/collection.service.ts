import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { isUndefined } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private storage: Storage) { }

  addToCollection(id: string, amount: number) {
    return this.storage.get('collection').then(collection => {
      let existingAmount = collection[id];
      if (isUndefined(existingAmount) || existingAmount.amount !== amount) {
        collection[id] = amount;
        this.storage.set('collection', collection);
      }
    });
  }

  logCollection() {
    this.storage.get('collection').then(console.dir);
  }

  clearCollection() {
    this.storage.set('collection', {});
  }
}
