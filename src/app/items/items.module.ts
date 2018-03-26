import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemListComponent } from './item-list.component';
import { ItemDetailComponent } from './item-detail.component';

import { PhotoService } from '../photo.service';

import { ItemsRoutingModule } from './items-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule
  ],
  declarations: [
    ItemListComponent,
    ItemDetailComponent
  ],
  providers: [PhotoService]
})
export class ItemsModule { }
