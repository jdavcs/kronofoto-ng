import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule }                from '../shared.module';
import { ItemsRoutingModule }          from './items-routing.module';
import { ItemDetailComponent }         from './item-detail.component';
import { ItemListComponent }           from './item-list.component';
import { CollectionItemListComponent } from './collection-item-list.component';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    SharedModule
  ],
  declarations: [
    ItemListComponent,
    CollectionItemListComponent,
    ItemDetailComponent
  ]
})
export class ItemsModule { }
