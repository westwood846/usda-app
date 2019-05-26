import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';

import { UsdaProvider } from '../usda.service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements AfterViewInit {

  currentQuery: string = '';
  currentItems: any = [];
  searchInProgress = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usda: UsdaProvider) { }

  @ViewChild(Searchbar) viewChild: Searchbar;

  ngAfterViewInit() {
    setTimeout(() => this.viewChild.setFocus(), 500);;
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.searchInProgress = true;
    this.usda.query(val).subscribe(result => {
      console.dir(result);
      this.searchInProgress = false;
      this.currentItems = result['list'] ? result['list'].item : [];
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.navCtrl.push('ItemDetailPage', {
      id: item.ndbno
    });
  }

}
