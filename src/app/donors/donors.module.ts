import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule }        from '../shared.module';
import { DonorsRoutingModule } from './donors-routing.module';
import { DonorListComponent }  from './donor-list.component';

@NgModule({
  imports: [
    CommonModule,
    DonorsRoutingModule,
    SharedModule
  ],
  declarations: [
    DonorListComponent
  ]
})
export class DonorsModule { }

