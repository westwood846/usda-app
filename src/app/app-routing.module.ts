import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'detail/:id', loadChildren: './item-detail/item-detail.module#ItemDetailPageModule' },
  { path: 'collection', loadChildren: './item-master/item-master.module#ItemMasterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
