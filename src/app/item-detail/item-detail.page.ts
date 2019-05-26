import { Component } from '@angular/core';

import { UsdaService } from '../usda.service';
import { ReferenceService } from '../reference.service';

import { map, tap, flatMap } from 'rxjs/operators'

import { groupBy, compact, uniq } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'page-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage {
  id: string;
  food: any;
  nutrientGroups = {};
  _compact = compact;
  amount = 100;
  ref = {};


  constructor(public usda: UsdaService, private router: Router, private activatedRoute: ActivatedRoute, private collectionService: CollectionService) {
    let $id = this.activatedRoute.paramMap.pipe(map(paramMap => paramMap.get('id')), tap(id => this.id = id));
    let $food = $id.pipe(flatMap(id => usda.get(id)), map(result => result['foods'][0].food));
    
    $food.subscribe(food => {
      console.dir(food);
      this.food = food;
      this.nutrientGroups = groupBy(food.nutrients, 'group');
      console.dir(this.nutrientGroups)
    });
    this.ref = ReferenceService.getReference();

    this.collectionService.getCollectionObservable().subscribe(console.log);
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
