import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent } from './item-list.component';
import { ItemDetailComponent } from './item-detail.component';

const itemRoutes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'items/:identifier', component: ItemDetailComponent }
  //{ path: 'collections/:id/items', component: ItemListComponent },
  //{ path: 'donors/:id/items', component: ItemListComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(itemRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ItemsRoutingModule {}


