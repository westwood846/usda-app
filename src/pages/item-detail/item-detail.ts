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
  food: Observable<any>;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public usda: UsdaProvider) {
    this.id = navParams.get('id');
    usda.get(this.id).pipe(tap(console.dir), map(result => result.foods[0].food)).subscribe(food => this.food = food);
  }

}
