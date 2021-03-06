import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

import { UsdaService } from '../usda.service';
import { Router } from '@angular/router';

import { compact } from 'lodash';

@Component({
  selector: 'page-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements AfterViewInit {

  currentQuery: string = '';
  currentItems: any = [];
  searchInProgress = false;

  _compact = compact;

  constructor(private router: Router, public usda: UsdaService) { }

  @ViewChild(IonSearchbar) viewChild: IonSearchbar;

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
    this.usda.search(val).subscribe(result => {
      this.searchInProgress = false;
      this.currentItems = result['list'] ? result['list'].item : [];
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.router.navigate(['/detail', item.ndbno]);
  }

}
