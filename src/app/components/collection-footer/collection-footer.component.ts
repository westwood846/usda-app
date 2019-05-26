import { Component } from '@angular/core';
import { CollectionService } from 'src/app/collection.service';
import { Observable } from 'rxjs';

import { size } from 'lodash';

@Component({
  selector: 'collection-footer',
  templateUrl: './collection-footer.component.html',
  styleUrls: ['./collection-footer.component.scss'],
})
export class CollectionFooterComponent {


  public collection: Observable<any>;
  public _size = size;

  constructor(private collectionService: CollectionService) {
    this.collection = this.collectionService.getCollectionObservable();
  }

}
