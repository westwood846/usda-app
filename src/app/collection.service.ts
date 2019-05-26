import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { uniq } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private storage: Storage) { }

  addToCollection(id: string, amount: number) {
    this.storage.get('collection').then(collection => {
      this.storage.set('collection', uniq([...(collection||[]), {id, amount}]));
    })
  }

  logCollection() {
    this.storage.get('collection').then(console.dir);
  }

  clearCollection() {
    this.storage.set('collection', []);
  }
}
