import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemDetailPage } from './item-detail';

import { PipesModule } from '../../pipes/pipes.module';
import { CollectionFooterComponent } from '../../components/collection-footer/collection-footer';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
  exports: [
    ItemDetailPage
  ]
})
export class ItemDetailPageModule { }
