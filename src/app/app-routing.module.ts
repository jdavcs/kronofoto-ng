import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DonorListComponent } from './donor-list/donor-list.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  { path: 'donors', component: DonorListComponent },
  { path: 'donors/:id', component: DonorDetailComponent },

  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing : false } //true for debug only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
