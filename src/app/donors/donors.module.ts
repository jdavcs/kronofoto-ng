import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule }        from '../shared.module';
import { DonorsRoutingModule } from './donors-routing.module';
import { DonorsComponent } from './donors.component';

@NgModule({
  imports: [
    CommonModule,
    DonorsRoutingModule,
    SharedModule
  ],
  declarations: [ DonorsComponent ]
})
export class DonorsModule { }

