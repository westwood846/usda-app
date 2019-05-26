import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { isUndefined } from 'lodash';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private collectionSubject = new Subject<any>();

  constructor(private storage: Storage) {
    this.storage.get('collection').then(collection => {
      this.collectionSubject.next(collection);
    });
  }

  addToCollection(id: string, amount: number) {
    return this.storage.get('collection').then(collection => {
      let existingAmount = collection[id];
      if (isUndefined(existingAmount) || existingAmount.amount !== amount) {
        collection[id] = amount;
        this.storage.set('collection', collection);
        this.collectionSubject.next(collection);
      }
    });
  }

  logCollection() {
    this.storage.get('collection').then(console.dir);
  }

  clearCollection() {
    this.storage.set('collection', {});
    this.collectionSubject.next({});
  }

  getCollectionObservable() {
    return this.collectionSubject.asObservable();
  }
}
