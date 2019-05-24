import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers';
import { UsdaProvider } from '../../providers/usda/usda';

import { tap, map } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  id: any;
  food: any;
  nutrientGroups = {};
  
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public usda: UsdaProvider) {
    this.id = navParams.get('id') || '11090';
    usda.get(this.id).pipe(map(result => result['foods'][0].food)).subscribe(food => {
      console.dir(food);
      this.food = food;
      this.nutrientGroups = groupBy(food.nutrients, 'group');
      console.dir(this.nutrientGroups)
    });
  }

}
