import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionFooterComponent } from './collection-footer/collection-footer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CollectionFooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CollectionFooterComponent]
})
export class ComponentsModule { }
