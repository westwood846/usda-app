import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionFooterComponent } from './collection-footer/collection-footer.component';
import { IonicModule } from '@ionic/angular';

import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [CollectionFooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgPipesModule
  ],
  exports: [CollectionFooterComponent]
})
export class ComponentsModule { }
