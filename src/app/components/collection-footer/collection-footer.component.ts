import { Component } from '@angular/core';
import { CollectionService } from 'src/app/collection.service';
import { Observable, BehaviorSubject } from 'rxjs';

import { size } from 'lodash';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'collection-footer',
  templateUrl: './collection-footer.component.html',
  styleUrls: ['./collection-footer.component.scss'],
})
export class CollectionFooterComponent {

  public collection: BehaviorSubject<any>;
  public _size = size;

  constructor(private collectionService: CollectionService) {
    this.collection = collectionService.collection;
    this.collection.subscribe(collection => console.log(size(collection)));
  }

}
