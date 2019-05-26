import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  public collection: BehaviorSubject<any>;

  constructor(private collectionService: CollectionService) {
    this.collection = collectionService.collection;
  }

  ngOnInit() {
  }

}
