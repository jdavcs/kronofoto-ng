import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionListComponent } from './collection-list/collection-list.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  { path: 'collections', component: CollectionListComponent },
  { path: 'collections/:id', component: CollectionDetailComponent },

  { path: 'donors', component: DonorListComponent },
  { path: 'donors/:id', component: DonorDetailComponent },

  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing : true } //debug only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}


