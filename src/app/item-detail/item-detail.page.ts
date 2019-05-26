import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';

import { UsdaService } from '../usda.service';
import { ReferenceService } from '../reference.service';

import { map } from 'rxjs/operators'

import { groupBy, compact, uniq } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'page-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage {
  id: any;
  food: any;
  nutrientGroups = {};
  _compact = compact;
  amount = 100;
  ref = {};


  constructor(public usda: UsdaService, private storage: Storage, private router: Router) {
    this.id = '09326'; // TODO: Get from path params
    usda.get(this.id).pipe(map(result => result['foods'][0].food)).subscribe(food => {
      console.dir(food);
      this.food = food;
      this.nutrientGroups = groupBy(food.nutrients, 'group');
      console.dir(this.nutrientGroups)
    });
    this.ref = ReferenceService.getReference();

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
