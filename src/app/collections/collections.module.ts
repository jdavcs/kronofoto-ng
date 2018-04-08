import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';

import { CollectionListComponent } from './collection-list.component';
import { CollectionDetailComponent } from './collection-detail.component';

import { CollectionService } from '../model/collection.service';
import { YearSpanPipe } from '../year-span.pipe';

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
  ],
  providers: [CollectionService]
})
export class CollectionsModule { }

