import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionListComponent } from './collection-list.component';

const collectionRoutes: Routes = [
  { path: 'collections', component: CollectionListComponent },
  { path: 'collection/:id', redirectTo: 'collection/:id/items' }
]

@NgModule({
  imports: [
    RouterModule.forChild(collectionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CollectionsRoutingModule {}
