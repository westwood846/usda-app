import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { UsdaProvider } from '../usda.service';
import { ReferenceProvider } from '../reference.service';

import { map } from 'rxjs/operators'

import { groupBy, compact, uniq } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  id: any;
  food: any;
  nutrientGroups = {};
  _compact = compact;
  amount = 100;
  ref = {};


  constructor(public usda: UsdaProvider, private storage: Storage, private router: Router) {
    this.id = '09326'; // TODO: Get from path params
    usda.get(this.id).pipe(map(result => result['foods'][0].food)).subscribe(food => {
      console.dir(food);
      this.food = food;
      this.nutrientGroups = groupBy(food.nutrients, 'group');
      console.dir(this.nutrientGroups)
    });
    this.ref = ReferenceProvider.getReference();

  }

  gotToSearch() {
    this.router.navigate(['/search']);
  }

  addToCollection() {
    this.storage.get('collection').then(collection => {
      this.storage.set('collection', uniq([...(collection||[]), {id: this.id, amount: this.amount}]));
    })
  }

  logCollection() {
    this.storage.get('collection').then(console.dir);
  }

  clearCollection() {
    this.storage.set('collection', []);
  }

}
