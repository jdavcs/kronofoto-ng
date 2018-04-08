import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';

import { CollectionListComponent } from './collection-list.component';
import { CollectionDetailComponent } from './collection-detail.component';

import { CollectionsRoutingModule } from './collections-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule
  ],
  declarations: [
    CollectionListComponent,
    CollectionDetailComponent
  ]
})
export class CollectionsModule { }

