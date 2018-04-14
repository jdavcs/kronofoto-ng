import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }         from './home.component';
import { PageNotFoundComponent } from './pagenotfound.component';

const appRoutes: Routes = [
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
