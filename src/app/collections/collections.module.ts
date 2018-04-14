import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule }             from '../shared.module';
import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionListComponent }  from './collection-list.component';

@NgModule({
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule
  ],
  declarations: [
    CollectionListComponent
  ]
})
export class CollectionsModule { }
