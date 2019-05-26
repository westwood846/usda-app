import { Component } from '@angular/core';

import { UsdaService } from '../usda.service';
import { ReferenceService } from '../reference.service';

import { map } from 'rxjs/operators'

import { groupBy, compact, uniq } from 'lodash';
import { Router } from '@angular/router';
import { CollectionService } from '../collection.service';

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


  constructor(public usda: UsdaService, private router: Router, private collectionService: CollectionService) {
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
    this.collectionService.addToCollection(this.id, this.amount);
  }

  logCollection() {
    this.collectionService.logCollection();
  }

  clearCollection() {
    this.collectionService.clearCollection();
  }

}
