import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionFooterComponent } from './collection-footer/collection-footer.component';
import { IonicModule } from '@ionic/angular';

import { NgPipesModule } from 'ngx-pipes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CollectionFooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgPipesModule,
    RouterModule
  ],
  exports: [CollectionFooterComponent]
})
export class ComponentsModule { }
