import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DonorsComponent } from './donors.component';

const donorRoutes: Routes = [
  { path: 'contribute', component: DonorsComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(donorRoutes) ],
  exports: [ RouterModule ]
})
export class DonorsRoutingModule {}

