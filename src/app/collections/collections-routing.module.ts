import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionListComponent } from './collection-list.component';
import { CollectionDetailComponent } from './collection-detail.component';

const collectionRoutes: Routes = [
  { path: 'collections', component: CollectionListComponent },
  { path: 'collections/:id', component: CollectionDetailComponent }
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
