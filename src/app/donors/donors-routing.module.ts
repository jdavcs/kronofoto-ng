import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DonorListComponent } from './donor-list.component';

const donorRoutes: Routes = [
  { path: 'donors', component: DonorListComponent },
  { path: 'donors/:id', redirectTo: 'donors/:id/items' }
]

@NgModule({
  imports: [
    RouterModule.forChild(donorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DonorsRoutingModule {}

